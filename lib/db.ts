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

    console.log(`DB_INIT: Initializing Prisma with connection string (length: ${connectionString.length})`);

    // If using Prisma Accelerate (prisma+postgres://), we don't need a driver adapter.
    if (connectionString.startsWith('prisma://') || connectionString.startsWith('prisma+postgres://')) {
        console.log("DB_INIT: Prisma Accelerate protocol detected. Using direct connection.");
        return new PrismaClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        } as any);
    }

    console.log("DB_INIT: Standard PostgreSQL URL detected. Using Neon Serverless adapter.");
    try {
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeon(pool as any);
        return new PrismaClient({ adapter } as any);
    } catch (error) {
        console.error("DB_INIT: Failed to initialize Neon adapter, falling back to direct connection:", error);
        return new PrismaClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        } as any);
    }
};

// Use globalThis to cache the client instance in development to prevent hot-reloading connection leaks.
export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
