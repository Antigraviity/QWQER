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
    const connectionString = getConnectionString();

    if (!connectionString) {
        console.error("DB_INIT: No connection string found in environment variables.");
        return new PrismaClient();
    }

    // If using Prisma Accelerate (prisma+postgres://), we don't need a driver adapter.
    // Accelerate is a proxy that handles connection pooling and edge routing natively.
    if (connectionString.startsWith('prisma://') || connectionString.startsWith('prisma+postgres://')) {
        console.log("DB_INIT: Prisma Accelerate/Data Proxy detected. Using direct connection strategy.");
        return new PrismaClient({ datasourceUrl: connectionString } as any);
    }

    console.log("DB_INIT: Standard PostgreSQL URL detected. Using Neon Serverless adapter over WebSockets for Vercel compatibility.");
    try {
        // Use Neon's serverless driver for standard postgres:// URLs to bypass Vercel's TCP limits
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeon(pool as any);
        return new PrismaClient({ adapter } as any);
    } catch (error) {
        console.error("DB_INIT: Failed to initialize Neon adapter, falling back to standard client:", error);
        return new PrismaClient({ datasourceUrl: connectionString } as any);
    }
};

// Use globalThis to cache the client instance in development to prevent hot-reloading connection leaks.
export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
