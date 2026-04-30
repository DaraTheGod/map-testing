import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // runs on login

      if (account && profile) {
        token.googleId = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;

        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      return token;
    },

    async session({ session, token }) {
      // send data to frontend

      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture,
      };

      session.googleId = token.googleId;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;

      return session;
    },

    async signIn({ user, account, profile }) {
      console.log("===== GOOGLE LOGIN =====");

      console.log("SAVE THIS TO DB:");
      console.log({
        googleId: profile?.sub,
        email: profile?.email,
        name: profile?.name,
        image: profile?.picture,
      });

      console.log("TOKENS (TEMP):");
      console.log({
        access_token: account?.access_token,
        id_token: account?.id_token,
      });

      return true;
    },
  },
});

export { handler as GET, handler as POST };
