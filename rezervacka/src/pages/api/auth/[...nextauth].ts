import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const allowedEmails = [
    'samueldubik@gmail.com'
];


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
        async signIn({ user, account, profile, email}) {
            if(allowedEmails.includes(profile?.email || "")) {
                return true;
            }
            return false;
        },

        async redirect({ url, baseUrl}) {
            return '/admin';
        },

        async session({ session, token, user}) {
            if(session.user) {
                session.user.isAdmin = token.isAdmin as boolean | undefined;
            }
            return session;
        },

        async jwt({ token, user, account, profile}) {
            if(profile) {
                token.isAdmin = allowedEmails.includes(profile.email || "");
            }
            return token;
        },
    },
});