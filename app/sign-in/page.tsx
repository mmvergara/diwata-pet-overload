"use client";
import { SubmitButton } from "@/components/SubmitButton";
import { Card } from "@/components/ui/card";
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
    if (res.error) {
      setError(res.error);
    }
  };

  return (
    <main className="flex items-center justify-center pt-[10vh] ">
      <div className="flex items-center justify-center flex-col glass p-8 gap-4">
        <div className="text-md flex items-center flex-col sm:text-4xl font-bold ">
          <h1 className="text-sm ">Diwata Pet Overload </h1>
          <Separator className="bg-black" />
          <span>Sign In</span>
        </div>
        <p className="text-red-500">{error}</p>
        <form
          action={handleFormSubmit}
          className="flex flex-col gap-2 w-[300px]"
        >
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
            pendingText="Signing in..."
            className="p-2 bg-brownPri hover:bg-brownSec rounded-lg"
          >
            Sign In
          </SubmitButton>
        </form>
        <Link
          href="/sign-up"
          className="text-amber-900 font-semibold hover:underline pb-10"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </main>
  );
}
