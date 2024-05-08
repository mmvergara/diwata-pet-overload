import { PaymentDialog } from "@/components/PaymentDialog";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserCartProducts, getUserCartProducts } from "@/db/cart";
import { formatNumberComma } from "@/lib/utils";
import { ReceiptText } from "lucide-react";

const CheckoutPage = async () => {
  const cartProducts = await getUserCartProducts();

  const totalQuantity =
    cartProducts?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cartProducts?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;
  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[300px] flex-col flex-wrap gap-4 p-4 ">
        <section className="flex items-center justify-between">
          <h1 className="flex gap-2 text-2xl font-bold">Checkout</h1>
          <ReceiptText className="ml-2" />
        </section>
        <Separator />
        <section className="flex flex-col gap-2">
          {cartProducts?.map((cartProduct) => (
            <div className="flex flex-col" key={cartProduct.product.id}>
              <p className="text-sm font-semibold">
                {cartProduct.product.name} x{cartProduct.quantity}
              </p>
              <span className="text-xs font-medium">
                ₱{" "}
                {formatNumberComma(
                  cartProduct.product.price * cartProduct.quantity,
                )}
                .00
              </span>
            </div>
          ))}
        </section>
        <Separator />
        <section className="flex flex-col">
          <p className="text-sm font-semibold">Total Items: {totalQuantity}</p>
          <p className="text-sm font-semibold">
            Checkout Price: ₱{formatNumberComma(totalPrice)}.00
          </p>
        </section>
        <div>
          <PaymentDialog UserCartProducts={cartProducts} />
        </div>
      </Card>
    </main>
  );
};

export default CheckoutPage;
