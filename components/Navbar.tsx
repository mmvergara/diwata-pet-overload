"use client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const session = useSession();
  return (
    <nav className="py-2 bg-[#6b3614] text-white flex justify-center items-center px-4 drop-shadow-md shadow-lg">
      <div className="w-full max-w-[1240px] h-[40px] flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">logo</Link>
        {session.status !== "loading" && (
          <div className="font-semibold">
            {session.status === "unauthenticated" && (
              <Link href="/auth/sign-in">
                <Button
                  variant="outline"
                  className="ml-4 text-black shadow-md font-bold"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
