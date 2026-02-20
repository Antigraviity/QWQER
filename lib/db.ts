import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

declare global {
    var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("DB_INIT: No DATABASE_URL found");
        return new PrismaClient();
    }

    try {
        console.log("DB_INIT: Initializing PG adapter (TCP)");
        const pool = new Pool({
            connectionString: connectionString.trim(),
            ssl: { rejectUnauthorized: false }
        });
        const adapter = new PrismaPg(pool);
        return new PrismaClient({
            adapter,
            log: ['query', 'info', 'warn', 'error'],
        } as any);
    } catch (error) {
        console.error("DB_INIT: PG adapter initialization failed:", error);
    }

    return new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
};

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
