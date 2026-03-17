'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
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
