"use client";
import { signUpSchema } from "@/lib/zod";
import { SubmitButton } from "@/components/SubmitButton";
import { signUpAction } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (formData: FormData) => {
    setError("");
    const formValues = {
      username: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) return setError(error.issues[0].message);

    const res = await signUpAction(formValues);
    if (res?.error) return setError(res.error);
  };

  return (
    <main className="flex items-center justify-center pt-[10vh] ">
      <div className="flex items-center justify-center flex-col glass p-8 gap-4">
        <div className="text-md flex items-center flex-col sm:text-4xl font-bold ">
          <h1 className="text-sm ">Diwata Pet Overload </h1>
          <Separator className="bg-black" />
          <span>Sign Up</span>
        </div>
        <p className="text-red-500">{error}</p>
        <form
          action={handleFormSubmit}
          className="flex flex-col gap-2 w-[300px]"
        >
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            className="p-2 px-4 rounded-md outline-none drop-shadow-sm"
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="hello@example.com"
            className="p-2 px-4 rounded-md outline-none drop-shadow-sm"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="●●●●●●●"
            className="p-2 px-4 rounded-md outline-none drop-shadow-sm"
          />
          <SubmitButton
            pendingText="Creating account..."
            className="p-2 bg-brownPri hover:bg-brownSec rounded-lg"
          >
            Sign Up
          </SubmitButton>
        </form>
        <Link
          href="/auth/sign-in"
          className="text-amber-900 font-semibold hover:underline pb-5"
        >
          I already have an account
        </Link>
      </div>
    </main>
  );
}
