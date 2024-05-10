"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const removeProductFromCart = async (productId: string) => {
  const session = await auth();
  if (!session) return null;

  const userId = session.user.id;

  try {
    // get user cart
    const userCart = await getUserCartById(userId);

    // remove product from cart
    await prisma.cartProduct.deleteMany({
      where: {
        cartId: userCart.id,
        productId,
      },
    });

    return await getUserCartProducts();
  } catch (error) {
    return null;
  }
};

export const updateUserCartProductQuantity = async (
  productId: string,
  add: number,
  forceUpdate?: number,
) => {
  const session = await auth();
  if (!session) return null;

  const userId = session.user.id;

  try {
    // get user cart
    const userCart = await getUserCartById(userId);

    // get product in cart
    const productInCart = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart.id,
        productId,
      },
    });
    if (!productInCart) return null;

    // update quantity
    if (forceUpdate) {
      await prisma.cartProduct.update({
        where: {
          id: productInCart.id,
        },
        data: {
          quantity: forceUpdate,
        },
      });
    } else {
      await prisma.cartProduct.update({
        where: {
          id: productInCart.id,
        },
        data: {
          quantity: {
            increment: add,
          },
        },
      });
    }

    return await getUserCartProducts();
  } catch (error) {
    return null;
  }
};

export const getUserCartProducts = async () => {
  const session = await auth();
  if (!session) return null;

  const userId = session.user.id;

  const res = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return res?.items;
};

// get the return type of getUserCartProducts
export type UserCartProducts = Awaited<ReturnType<typeof getUserCartProducts>>;

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
