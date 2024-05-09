import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/db/order";
import { StatusColors, cn, formatNumberComma } from "@/lib/utils";
import { ReceiptText } from "lucide-react";
import Link from "next/link";

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const session = await auth();
  if (!session) return null;
  const isAdmin = session.user.role === "ADMIN";
  const order = await getOrderById(params.orderId);
  if (!order) return <></>;
  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[500px] flex-col flex-wrap gap-4 p-4 ">
        <section className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-l flex gap-2 font-bold">OrderID: {order.id}</h1>
            <p className="text-xs font-bold">
              Paypal Order ID: {order.paypalOrderId}
            </p>
          </div>
          <ReceiptText className="ml-2" />
        </section>

        <Separator />
        <section className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span>Status:</span>
            <span
              className={cn(StatusColors[order.status], "rounded-md p-1 px-2")}
            >
              {order.status}
            </span>
          </p>
          <p className="text-sm font-semibold">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <p className="text-sm font-semibold">
            Shipping Address: {order.address}
          </p>

          <p className="text-sm font-semibold">
            Total: ₱{formatNumberComma(order.total)}.00
          </p>

          <Link href={isAdmin ? `/admin/orders/` : `/u/orders/`}>
            <Button>Back to Orders</Button>
          </Link>
        </section>
      </Card>
    </main>
  );
};

export default OrderPage;
