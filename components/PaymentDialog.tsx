"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NEXT_PUBLIC_PAYPAL_CLIENT_ID } from "@/config-public";
import { UserCartProducts } from "@/db/cart";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
type Props = {
  UserCartProducts: UserCartProducts;
};
export function PaymentDialog({ UserCartProducts }: Props) {
  if (UserCartProducts === null || UserCartProducts === undefined) return <></>;

  const items = UserCartProducts.map((product) => {
    return {
      name: product.product.name,
      quantity: product.quantity.toString(),
      unit_amount: {
        currency_code: "PHP",
        value: product.product.price.toString(),
      },
    };
  });

  const amountValue = UserCartProducts.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  ).toString();

  const onCreateOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          items,
          amount: {
            value: amountValue,
            currency_code: "PHP",
            breakdown: {
              item_total: {
                currency_code: "PHP",
                value: amountValue,
              },
            },
          },
        },
      ],
    });
  };

  const onApproveOrder = async (
    data: OnApproveData,
    actions: OnApproveActions,
  ): Promise<void> => {
    console.log(data);
    console.log(data);
    console.log(actions);
    try {
      return actions?.order?.capture().then((details) => {
        console.log(details);
        console.log(details);
        console.log(details);
      });
    } catch (error) {
      return;
    }
  };
  console.log(NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full grow">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Using Paypal</DialogTitle>
          <DialogDescription>
            {`You will be redirected to Paypal to complete your payment.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <PayPalScriptProvider
            options={{
              clientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
              currency: "PHP",
              intent: "capture",
            }}
          >
            <PayPalButtons
              createOrder={onCreateOrder}
              onApprove={onApproveOrder}
              style={{ layout: "horizontal" }}
            />
          </PayPalScriptProvider>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

[
  {
    field:
      "/purchase_units/@reference_id=='default'/amount/breakdown/item_total",
    location: "body",
    issue: "ITEM_TOTAL_REQUIRED",
    description:
      "If item details are specified (items.unit_amount and items.quantity) corresponding amount.breakdown.item_total is required.",
  },
];
