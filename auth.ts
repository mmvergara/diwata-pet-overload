import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { getUserById } from "./db/user";
import { ROLE } from "@prisma/client";

let called = 0;

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as ROLE;
        session.user.avatar = token.avatar as string;
      }

      console.log("session called=", called++);

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);

      // if user is not found, or a server error occurs
      if (!user) return token;
      token.role = user.role;
      token.avatar = user.avatar;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
