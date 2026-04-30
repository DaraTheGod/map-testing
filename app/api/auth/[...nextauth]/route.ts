import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 1. MODULE AUGMENTATION: Fixes Session and JWT type errors
declare module "next-auth" {
  interface Session {
    googleId?: string;
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
    accessToken?: string;
    idToken?: string;
    picture?: string;
  }
}

// 2. PROVIDER TYPE: Fixes the 'profile.picture' error
interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

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
      // Cast profile to our custom GoogleProfile to access .picture and .sub safely
      const googleProfile = profile as unknown as GoogleProfile;

      if (account && googleProfile) {
        token.googleId = googleProfile.sub;
        token.name = googleProfile.name;
        token.email = googleProfile.email;
        token.picture = googleProfile.picture;

        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      return token;
    },

    async session({ session, token }) {
      // These no longer error because of the 'declare module' above
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      session.googleId = token.googleId;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;

      return session;
    },

    async signIn({ account, profile }) {
      const googleProfile = profile as unknown as GoogleProfile;

      console.log("===== GOOGLE LOGIN =====");
      console.log("SAVE THIS TO DB:", {
        googleId: googleProfile?.sub,
        email: googleProfile?.email,
        name: googleProfile?.name,
        image: googleProfile?.picture,
      });

      return true;
    },
  },
});

export { handler as GET, handler as POST };
