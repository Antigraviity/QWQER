import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl, url } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');

            // Allow access to login page
            if (nextUrl.pathname.startsWith('/admin/login')) {
                if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
                return true;
            }

            // Protect /admin routes
            if (isAdminPage) {
                if (isLoggedIn) return true;

                // Redirect unauthenticated users to login page without the callbackUrl query param
                const loginUrl = new URL('/admin/login', nextUrl);
                return Response.redirect(loginUrl);
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
