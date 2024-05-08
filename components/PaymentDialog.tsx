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
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { UserAddress } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
type Props = {
  userCartProducts: UserCartProducts;
  userAddresses: UserAddress[];
};
export function PaymentDialog({ userCartProducts, userAddresses }: Props) {
  if (userCartProducts === null || userCartProducts === undefined) return <></>;
  const [paypalBtnLoading, setPaypalBtnLoading] = useState<boolean>(true);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();

  const items = userCartProducts.map((product) => {
    return {
      name: product.product.name,
      quantity: product.quantity.toString(),
      unit_amount: {
        currency_code: "PHP",
        value: product.product.price.toString(),
      },
    };
  });

  const amountValue = userCartProducts
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toString();

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
    console.log(actions);
    try {
      actions?.order?.capture().then((details) => {
        console.log(details);
      });
    } catch (error) {
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full grow">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Finalizing Order</DialogTitle>
          <p className="flex flex-col">
            <span>Select Address: </span>
            <span className="text-xs font-medium opacity-60">
              if you don't have one address, please add one in{" "}
              <Link
                href="/u/profile"
                className="font-semibold text-blue-600 underline"
              >
                profile page
              </Link>
            </span>
          </p>

          <Select value={selectedAddress} onValueChange={setSelectedAddress}>
            <SelectTrigger className="mt-2 w-[250px]">
              <SelectValue placeholder="Select Address" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userAddresses.map((address) => {
                  return (
                    <SelectItem value={address.id} key={address.id}>
                      {address.fullAddress}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator className="mt-4" />
          <p className="flex flex-col">
            <span>Pay using Paypal </span>
            <span className="text-xs font-medium opacity-60">
              close and open again if the button is not showing
            </span>
          </p>

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
              style={{ layout: "horizontal", height: 40 }}
            />
          </PayPalScriptProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
