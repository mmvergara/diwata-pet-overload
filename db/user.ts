"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getCurrentUserData = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const updateUserFullName = async (id: string, fullName: string) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {  },
    });
  } catch (error) {
    return null;
  }
};
