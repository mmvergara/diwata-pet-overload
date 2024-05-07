import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { getUserById } from "./db/user";
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      console.log("USER", user);
      // if user is not found, or a server error occurs
      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
