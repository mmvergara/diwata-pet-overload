import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { signInFormSchema } from "./lib/zod";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate the fields
        const validatedFields = signInFormSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.log("Invalid fields", validatedFields.error);
          return null;
        }

        // Validate that the user exists
        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }

        // Check the password
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
          console.log("Invalid password");
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
