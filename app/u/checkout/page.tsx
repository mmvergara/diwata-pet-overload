import { PaymentDialog } from "@/components/PaymentDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ReceiptText } from "lucide-react";

const CheckoutPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[300px] flex-col flex-wrap gap-4 p-4 ">
        <section className="flex items-center justify-between">
          <h1 className="flex gap-2 text-2xl font-bold">Checkout</h1>
          <ReceiptText className="ml-2" />
        </section>
        <Separator />
        <section className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Blue Collar x3</p>
            <span className="text-xs font-medium">₱ 200.00</span>
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Blue Collar x3</p>
            <span className="text-xs font-medium">₱ 200.00</span>
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Blue Collar x3</p>
            <span className="text-xs font-medium">₱ 200.00</span>
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Blue Collar x3</p>
            <span className="text-xs font-medium">₱ 200.00</span>
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Blue Collar x3</p>
            <span className="text-xs font-medium">₱ 200.00</span>
          </div>
        </section>
        <Separator />
        <section className="flex flex-col">
          <p className="text-sm font-semibold">Total Items: 14</p>
          <p className="text-sm font-semibold">Checkout Price: 200,000.00</p>
        </section>
        <div>
          <PaymentDialog />
        </div>
      </Card>
    </main>
  );
};

export default CheckoutPage;
