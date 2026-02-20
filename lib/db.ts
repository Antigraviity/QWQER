import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

declare global {
    var prisma: PrismaClient | undefined;
}

let connectionString = process.env.DATABASE_URL;

if (connectionString?.startsWith('prisma+postgres://')) {
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

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any); // temporary bypass for type mismatch between Pool and adapter

export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
