"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const addProductToCart = async (productID: string) => {
  const session = await auth();
  if (!session) return { error: "You must be logged in to add items to cart." };

  const userId = session.user.id;

  try {
    // get user cart
    const userCart = await getUserCartById(userId);

    // check if product is already in cart
    const productInCart = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart.id,
        productId: productID,
      },
    });
    if (productInCart) return { error: null };

    // add product to cart
    await prisma.cartProduct.create({
      data: {
        cartId: userCart.id,
        quantity: 1,
        productId: productID,
      },
    });

    return { error: null };
  } catch (error) {
    console.log(error);
    return { error: "There was an error adding the product to your cart." };
  }
};

export const getUserCartById = async (userId: string) => {
  // Check if user has a cart already, if not create one
  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });
  if (!userCart) {
    return await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  return userCart;
};
