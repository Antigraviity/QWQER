import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import type { User } from '@/lib/definitions';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await db.user.findUnique({
            where: { email },
        });
        return user as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    trustHost: true,
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    try {
                        const user = await getUser(email);
                        if (!user || !user.password) {
                            console.log('User not found or no password for:', email);
                            return null;
                        }

                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (passwordsMatch) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                            };
                        }
                    } catch (error) {
                        console.error('Error during authorization:', error);
                        return null;
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
