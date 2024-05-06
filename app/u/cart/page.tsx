import { CartProductCard } from "@/components/CartProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

const CartPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[500px]  flex-row flex-wrap items-center justify-around gap-4 p-4 ">
        <div className="grow rounded-md bg-slate-100 p-2 font-semibold">
          Total Items: 14
        </div>
        <div className="grow rounded-md bg-slate-100 p-2 font-semibold">
          Checkout Price: 200,000.00
        </div>
        <Button className="grow">
          Checkout
          <ShoppingBag size={16} className="ml-2" />
        </Button>
      </Card>
      <section className="flex flex-wrap justify-center gap-4">
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
      </section>
    </main>
  );
};

export default CartPage;
