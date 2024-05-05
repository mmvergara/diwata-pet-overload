"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const session = useSession();
  return (
    <nav className="flex items-center justify-center bg-[#6b3614] px-4 py-2 text-white shadow-lg drop-shadow-md">
      <div className="flex h-[40px] w-full max-w-[1240px] items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          logo
        </Link>
        {session.status !== "loading" && (
          <div className="font-semibold">
            {session.status === "unauthenticated" && (
              <Link href="/auth/sign-in">
                <Button
                  variant="outline"
                  className="ml-4 font-bold text-black shadow-md"
                >
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/u/cart">
              <Button
                variant="outline"
                className="ml-4 h-[35px] w-[35px] rounded-full p-[8px] font-bold text-black shadow-md"
              >
                <ShoppingCart className="text-brownPri hover:text-brownSec" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
