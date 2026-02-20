'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log("Vercel Database Env Check:");
        console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
        console.log("POSTGRES_URL exists:", !!process.env.POSTGRES_URL);
        console.log("POSTGRES_PRISMA_URL exists:", !!process.env.POSTGRES_PRISMA_URL);

        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.error('NextAuth Error Type:', error.type);
            console.error('NextAuth Error Message:', error.message);

            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong. Check server logs.';
            }
        }
        throw error;
    }
}
