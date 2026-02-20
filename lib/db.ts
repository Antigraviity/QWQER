import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

declare global {
    var prisma: PrismaClient | undefined;
}

// Read connection string from environment, prioritizing standard Vercel variable names
const getConnectionString = () => {
    let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
        // Only warn in development, avoid crashing the Edge runtime immediately
        if (process.env.NODE_ENV !== 'production') {
            console.warn("Prisma: No DATABASE_URL or POSTGRES_URL found in environment variables.");
        }
        return '';
    }

    if (connectionString.startsWith('prisma+postgres://')) {
        try {
            const url = new URL(connectionString);
            const apiKey = url.searchParams.get('api_key');
            if (apiKey) {
                const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
                const parsed = JSON.parse(decoded);
                if (parsed.databaseUrl) connectionString = parsed.databaseUrl;
            }
        } catch (e) {
            console.error("Failed to parse Prisma Postgres DB URL", e);
        }
    }
    return connectionString;
};

// Create the Prisma client using a factory function to ensure env vars are read at invocation
const prismaClientSingleton = () => {
    const connectionString = getConnectionString();
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool as any);
    return new PrismaClient({ adapter });
};

export const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
