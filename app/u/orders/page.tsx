import OrderUpdateStatus from "@/components/OrderUpdateStatus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUserRecentOrders } from "@/db/order";
import { cn, formatNumberComma } from "@/lib/utils";
import Link from "next/link";

const StatusColors = {
  PENDING: "bg-yellow-500",
  INTRANSIT: "bg-blue-500",
  DELIVERED: "bg-green-500",
};

const OrdersPage = async () => {
  const orders = (await getCurrentUserRecentOrders()) || [];
  return (
    <main className="mx-2 flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[1000px] flex-col flex-wrap gap-4 p-4 ">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    className="font-medium hover:underline"
                    href={`/u/orders/${order.id}`}
                  >
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>₱{formatNumberComma(order.total)}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      StatusColors[order.status],
                      "rounded-sm p-1 font-semibold text-white shadow-md",
                    )}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
};

export default OrdersPage;
