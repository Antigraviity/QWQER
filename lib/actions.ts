'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { rateLimit } from '@/lib/rate-limit';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    // Rate limit: 5 login attempts per 15 minutes per email
    const email = formData.get('email') as string || 'unknown';
    const { success: rateLimitOk } = rateLimit(`login:${email}`, 5, 15 * 60 * 1000);
    if (!rateLimitOk) {
        return 'Too many login attempts. Please try again in 15 minutes.';
    }

    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/admin',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error('Auth error type:', error.type);
            console.error('Auth error message:', error.message);
            console.error('Auth error cause:', (error as any).cause?.err?.message || 'unknown');

            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong. Please try again.';
            }
        }
        throw error;
    }
}
