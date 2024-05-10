"use server";
import prisma from "@/lib/prisma";

export const createUserBoughtProduct = async (
  userId: string,
  productId: string,
) => {
  try {
    const res = await prisma.userBoughtProduct.create({
      data: {
        userId,
        productId,
      },
    });
    return res;
  } catch (e) {
    return null;
  }
};

export const userHasBoughtProduct = async (
  userId: string,
  productId: string,
) => {
  try {
    const res = await prisma.userBoughtProduct.findFirst({
      where: {
        userId,
        productId,
      },
    });
    return res;
  } catch (e) {
    return null;
  }
};
