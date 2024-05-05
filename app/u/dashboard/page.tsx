import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleUserRound, ListOrdered, ShoppingCart } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <main className="flex items-center justify-center flex-wrap gap-4 pt-[10vh] text-white">
      <Link href="/cart">
        <Card className="w-[250px] min-h-[150px] hover:scale-105 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold text-brownPri flex items-center gap-2">
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
        <Card className="w-[250px] min-h-[150px] hover:scale-105 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold text-brownPri flex items-center gap-2">
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
        <Card className="w-[250px] min-h-[150px] hover:scale-105 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <h1 className="text-3xl font-semibold text-brownPri  flex items-center gap-2">
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
