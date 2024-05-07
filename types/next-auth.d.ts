import { ROLE } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      avatar: string;
      role: ROLE;
    } & DefaultSession["user"];
  }
}
