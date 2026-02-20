import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

declare global {
    var prisma: PrismaClient | undefined;
}

const getConnectionString = () => {
    let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
        console.error("DB_INIT: No connection string found! Env keys:", Object.keys(process.env).filter(k => k.includes('URL') || k.includes('POSTGRES')));
        return '';
    }

    console.log("DB_INIT: Connection string protocol:", connectionString.split(':')[0]);

    if (connectionString.startsWith('prisma+postgres://')) {
        try {
            const url = new URL(connectionString);
            const apiKey = url.searchParams.get('api_key');
            if (apiKey) {
                const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
                const parsed = JSON.parse(decoded);
                if (parsed.databaseUrl) {
                    console.log("DB_INIT: Successfully decoded Accelerate URL to direct URL.");
                    connectionString = parsed.databaseUrl;
                }
            }
        } catch (e) {
            console.error("DB_INIT: Error parsing Accelerate URL:", e);
        }
    }

    return connectionString;
};

const createPrismaClient = () => {
    console.log("DB_INIT: Creating new PrismaClient instance...");
    const connectionString = getConnectionString();

    if (!connectionString) {
        console.error("DB_INIT: Cannot create PrismaClient because connectionString is empty.");
        // We still return a client, but it will likely fail on first query with a helpful error
        return new PrismaClient();
    }

    try {
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeon(pool as any);
        return new PrismaClient({ adapter });
    } catch (error) {
        console.error("DB_INIT: Error during PrismaClient initialization:", error);
        return new PrismaClient();
    }
};

// Use globalThis to cache the instance in development to prevent hot-reload connection leaks
// In production, this will effectively be a singleton for the lifecycle of the lambda
export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
