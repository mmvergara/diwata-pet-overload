import { signOut } from "@/auth";
import { SubmitButton } from "@/components/SubmitBtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleUserRound, ListOrdered, LogOut, SquarePlus } from "lucide-react";
import Link from "next/link";

const AdminDashboardPage = async () => {
  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/home" });
  };
  return (
    <main className="px-4 pb-[20vh] pt-[5vh]">
      <div className="mx-auto flex w-full max-w-[780px] items-center justify-center gap-2 pb-2">
        <Link href="/admin/products/create" className="grow">
          <Button className="flex w-full gap-2">
            {" "}
            Add New Product <SquarePlus size={16} />
          </Button>
        </Link>
        <form action={handleLogout}>
          <SubmitButton
            className="order-red-500 flex max-w-[200px] grow gap-2 rounded-md border-2 border-red-500 bg-white font-medium text-red-500 hover:bg-btnWhitePri"
            type="submit"
            pendingText="Logging out..."
          >
            Logout <LogOut />
          </SubmitButton>
        </form>
      </div>
      <section className="mx-auto flex w-full max-w-[780px] flex-wrap items-center justify-center gap-2 text-white">
        <Link href="/admin/orders" className="grow">
          <Card className="min-h-[150px]  cursor-pointer transition-all hover:bg-slate-100">
            <CardHeader className="pb-2">
              <h1 className="flex items-center gap-2 text-3xl font-semibold text-brownPri">
                Orders <ListOrdered />
              </h1>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">
                View and manage all orders
              </p>
            </CardContent>
          </Card>
        </Link>
        {/* Profile */}
        <Link href="/u/profile" className="grow">
          <Card className="min-h-[150px]  cursor-pointer transition-all hover:bg-slate-100">
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
        </Link>{" "}
      </section>
    </main>
  );
};

export default AdminDashboardPage;
