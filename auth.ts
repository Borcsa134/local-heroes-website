import NextAuth, { type DefaultSession } from 'next-auth';
import Discord from 'next-auth/providers/discord';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds.members.read',
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'discord') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  trustHost: true,
});
