"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { SignInFormValues, SignUpFormValues, signUpFormSchema } from "./zod";

export const signInAction = async (signInValues: SignInFormValues) => {
  try {
    await signIn("credentials", signInValues);
  } catch (error) {
    console.log("ERRORR OCCURED SIGNIN ACTION", error);
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
  redirect("/u/dashboard");
};

export const signUpAction = async (signUpValues: SignUpFormValues) => {
  const { data } = await signUpFormSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    await prisma.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 10),
      },
    });
  } catch (error) {
    console.log("ERROR OCCURED SIGNUP ACTION", error);
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
      switch (error.code) {
        case "P2002":
          return { error: "Email already exists" };
        default:
          return { error: "An error occurred" };
      }
    }
    return { error: "An error occurred" };
  }
  redirect("/auth/sign-in");
};
