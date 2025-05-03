import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const allowedEmails = ['samueldubik@gmail.com', 'michal.gabonai@gmail.com'];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
        name: "MockAuth",
        credentials: {
          email: { label: "Email", type: "text" },
        },
        async authorize(credentials) {
          const { email } = credentials || {};
          if (allowedEmails.includes(email ?? '')) {
            return { id: "1", name: "Mock User", email, isAdmin: true };
          }
          throw new Error("Invalid email");
        },
      }),
    ],
  secret: process.env.NEXTAUTH_SECRET || '',
  callbacks: {
    async signIn({ profile, credentials }) {
      const email = profile?.email || credentials?.email || "";
      return allowedEmails.includes(email as string);
    },
    async redirect() {
      return "/admin";
    },
    async session({ session }) {
        return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };