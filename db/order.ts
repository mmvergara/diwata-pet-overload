"use server";
import { auth } from "@/auth";
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "@/config";
import prisma from "@/lib/prisma";
import { strToBase64 } from "@/lib/utils";
import { getUserAddressByAddressId } from "./address";

export const verifyPaypalOrder = async (orderId: string) => {
  const res = await fetch(
    `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strToBase64(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`,
      },
    },
  );
  if (res.status !== 200) {
    return true;
  }

  return false;
};

export const createOrder = async (
  orderId: string,
  cartId: string,
  addressId: string,
) => {
  const session = await auth();
  if (!session) return { error: "User not found", data: null };

  // verify paypal order
  console.log("=====================================");
  console.log("Verifying order....");
  const isVerifiedPaypalOrder = await verifyPaypalOrder(orderId);
  if (isVerifiedPaypalOrder) {
    return {
      error: "Could not verify order",
      data: null,
    };
  }

  console.log("Getting cart products....");
  // get cart products
  const cartProducts = await prisma.cartProduct.findMany({
    where: {
      cartId,
    },
    include: {
      product: true,
    },
  });

  const totalAmount = cartProducts.reduce(
    (acc, cartProduct) =>
      acc + cartProduct.product.price * cartProduct.quantity,
    0,
  );

  console.log("Getting address....");
  // get address
  const address = await getUserAddressByAddressId(addressId);
  if (!address) return { error: "Address not found", data: null };

  console.log("Creating order....");
  // create order
  const order = await prisma.order.create({
    data: {
      address: address.fullAddress,
      userId: session.user.id,
      total: totalAmount,
      items: {
        create: cartProducts.map((cartProduct) => ({
          productId: cartProduct.productId,
          quantity: cartProduct.quantity,
        })),
      },
    },
  });

  console.log("Deleting cart products....");
  // reset cart
  await prisma.cartProduct.deleteMany({
    where: {
      cartId,
    },
  });

  return { error: null, data: order.id };
};
