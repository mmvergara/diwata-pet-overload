import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleUserRound, ListOrdered, ShoppingCart } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="flex flex-wrap items-center justify-center gap-4 pt-[10vh] text-white">
      <Link href="/cart">
        <Card className="min-h-[150px] w-[250px] cursor-pointer transition-all hover:scale-105">
          <CardHeader className="pb-2">
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-brownPri">
              My Cart <ShoppingCart />
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold ">
              View your cart and checkout your items
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/orders">
        <Card className="min-h-[150px] w-[250px] cursor-pointer transition-all hover:scale-105">
          <CardHeader className="pb-2">
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-brownPri">
              Orders <ListOrdered />
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold">
              View your orders and track the status of your current orders
            </p>
          </CardContent>
        </Card>
      </Link>
      {/* Profile */}
      <Link href="/profile">
        <Card className="min-h-[150px] w-[250px] cursor-pointer transition-all hover:scale-105">
          <CardHeader className="pb-2">
            <h1 className="flex items-center gap-2  text-3xl font-semibold text-brownPri">
              Profile <CircleUserRound />
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold">
              Update your profile information
            </p>
          </CardContent>
        </Card>
      </Link>
    </main>
  );
};

export default DashboardPage;
