"use client";
import { SubmitButton } from "@/components/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signInAction({ email, password });
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <main className="flex items-center justify-center pt-[10vh] ">
      <div className="glass flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-md flex flex-col items-center font-bold sm:text-4xl ">
          <h1 className="text-sm ">Diwata Pet Overload </h1>
          <Separator className="bg-black" />
          <span>Sign In</span>
        </div>
        <p className="text-red-500">{error}</p>
        <form
          action={handleFormSubmit}
          className="flex w-[300px] flex-col gap-2"
        >
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
            pendingText="Signing in..."
            className="rounded-lg bg-brownPri p-2 hover:bg-brownSec"
          >
            Sign In
          </SubmitButton>
        </form>
        <Link
          href="/auth/sign-up"
          className="pb-5 font-semibold text-amber-900 hover:underline"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </main>
  );
}
