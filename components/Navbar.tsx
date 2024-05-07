import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar: React.FC = async () => {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="flex items-center justify-center bg-[#6b3614] px-4 py-2 text-white shadow-lg drop-shadow-md">
      <div className="flex h-[40px] w-full max-w-[1240px] items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          logo
        </Link>
        <div className="font-semibold">
          {!session?.user?.email ? (
            <Link href="/auth/sign-in">
              <Button
                variant="outline"
                className="ml-4 font-bold text-black shadow-md"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/u/cart">
                <Button
                  variant="outline"
                  className="ml-4 h-[35px] w-[35px] rounded-full p-[8px] font-bold text-black shadow-md"
                >
                  <ShoppingCart className="text-brownPri hover:text-brownSec" />
                </Button>
              </Link>
              <Link href="/u/dashboard">
                <Avatar className="max-h-[35px] max-w-[35px] ">
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback className="text-md text-brownPri shadow-md hover:text-brownSec">
                    U
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
