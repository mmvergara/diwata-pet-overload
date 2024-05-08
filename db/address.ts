"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addressFormSchema, productFormSchema } from "@/lib/zod";

export const getUserAddresses = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    return await prisma.userAddress.findMany({
      where: {
        userId: session.user.id,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getUserAddressByAddressId = async (addressId: string) => {
  try {
    return await prisma.userAddress.findUnique({
      where: {
        id: addressId,
      },
    });
  } catch (error) {
    return null;
  }
};

export const createUserAddress = async (formData: FormData) => {
  const fullAddress = formData.get("fullAddress") as string;
  const addressName = formData.get("addressName") as string;

  const formValues = { fullAddress, addressName };

  const { error } = await addressFormSchema.safeParseAsync(formValues);
  if (error) return { error: error.issues[0].message };

  const session = await auth();
  if (!session) return { error: "User not found" };
  try {
    await prisma.userAddress.create({
      data: {
        fullAddress,
        userId: session.user.id,
        addressName,
      },
    });
    return { error: null };
  } catch (error) {
    return { error: "Could not create address" };
  }
};
