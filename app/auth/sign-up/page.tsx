"use client";
import { SubmitButton } from "@/components/SubmitBtn";
import { signUpAction } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signUpFormSchema } from "@/lib/zod";

export default function SignUpPage() {
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (formData: FormData) => {
    setError("");
    const formValues = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpFormSchema.safeParseAsync(formValues);
    if (error) return setError(error.issues[0].message);

    const res = await signUpAction(formValues);
    if (res?.error) return setError(res.error);
  };

  return (
    <main className="flex items-center justify-center pt-[10vh] ">
      <div className="glass flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-md flex flex-col items-center font-bold sm:text-4xl ">
          <h1 className="text-sm ">Diwata Pet Overload </h1>
          <Separator className="bg-black" />
          <span>Sign Up</span>
        </div>
        <p className="text-red-500">{error}</p>
        <form
          action={handleFormSubmit}
          className="flex w-[300px] flex-col gap-2"
        >
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            className="rounded-md p-2 px-4 outline-none drop-shadow-sm"
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="hello@example.com"
            className="rounded-md p-2 px-4 outline-none drop-shadow-sm"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="●●●●●●●"
            className="rounded-md p-2 px-4 outline-none drop-shadow-sm"
          />
          <SubmitButton
            pendingText="Creating account..."
            className="rounded-lg bg-brownPri p-2 hover:bg-brownSec"
          >
            Sign Up
          </SubmitButton>
        </form>
        <Link
          href="/auth/sign-in"
          className="pb-5 font-semibold text-amber-900 hover:underline"
        >
          I already have an account
        </Link>
      </div>
    </main>
  );
}
