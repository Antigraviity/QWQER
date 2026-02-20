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
        console.warn("Prisma: No DATABASE_URL or POSTGRES_URL found.");
        return '';
    }

    console.log("Database connection string detected. Protocol:", connectionString.split(':')[0]);

    if (connectionString.startsWith('prisma+postgres://')) {
        try {
            const url = new URL(connectionString);
            const apiKey = url.searchParams.get('api_key');
            if (apiKey) {
                console.log("Prisma Accelerate URL detected, attempting to decode direct database URL...");
                const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
                const parsed = JSON.parse(decoded);
                if (parsed.databaseUrl) {
                    connectionString = parsed.databaseUrl;
                    console.log("Direct database URL decoded. Protocol:", connectionString.split(':')[0]);
                }
            } else {
                console.warn("Prisma Accelerate URL detected but no api_key found.");
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
