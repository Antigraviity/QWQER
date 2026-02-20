import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

declare global {
    var prisma: PrismaClient | undefined;
}

const getConnectionString = () => {
    return process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
};

const createPrismaClient = () => {
    let connectionString = getConnectionString();

    if (!connectionString) {
        console.error("DB_INIT: No connection string found! Env keys:", Object.keys(process.env).filter(k => k.includes('URL') || k.includes('POSTGRES')));
        return new PrismaClient();
    }

    // Attempt to decode Prisma Accelerate/Postgres URL to skip the problematic proxy layer on Vercel
    if (connectionString.startsWith('prisma+postgres://')) {
        try {
            const url = new URL(connectionString);
            const apiKey = url.searchParams.get('api_key');
            if (apiKey) {
                const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
                const parsed = JSON.parse(decoded);
                if (parsed.databaseUrl) {
                    console.log("DB_INIT: Successfully decoded Prisma Accelerate URL to direct database URL.");
                    connectionString = parsed.databaseUrl;
                }
            }
        } catch (e) {
            console.error("DB_INIT: Accelerate URL decoding failed:", e);
        }
    }

    try {
        const urlObj = new URL(connectionString);
        console.log(`DB_INIT: Connection target host: ${urlObj.host}`);

        // For standard PostgreSQL URLs (or decoded ones), use the Neon adapter on Vercel.
        // This is much more reliable in serverless environments as it uses WebSockets.
        if (connectionString.startsWith('postgresql://') || connectionString.startsWith('postgres://')) {
            console.log("DB_INIT: Initializing Neon Serverless adapter over WebSockets.");
            const pool = new Pool({ connectionString });
            const adapter = new PrismaNeon(pool as any);
            return new PrismaClient({
                adapter,
                log: ['info', 'warn', 'error']
            } as any);
        }
    } catch (error) {
        console.error("DB_INIT: Failed during robust initialization:", error);
    }

    console.log("DB_INIT: Falling back to standard PrismaClient initialization.");
    return new PrismaClient({
        log: ['info', 'warn', 'error']
    });
};

// Use globalThis to cache the client instance in development to prevent hot-reloading connection leaks.
export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
