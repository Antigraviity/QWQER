import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        jwt({ token, user }) {
            // Persist user id into the JWT token on sign-in
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            // Make user id available in session
            if (token?.id && session.user) {
                (session.user as any).id = token.id as string;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnLogin = nextUrl.pathname === '/admin/login';

            // Admin pages (except login) require authentication
            if (isOnAdmin && !isOnLogin) {
                return isLoggedIn;
            }

            // If logged in and on login page, redirect to admin dashboard
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL('/admin', nextUrl));
            }

            // All other pages are public
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
