"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { utapi } from "@/lib/uploadthing";
import { updateFullnameSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export const updateAvatar = async (formData: FormData) => {
  

  const [{ data, error }] = await utapi.uploadFiles([image]);
  
}

export const updateUserFullName = async (formData: FormData) => {
  const session = await auth();
  if (!session) return { error: null };
  const fullName = formData.get("fullName");
  const { error, data } = await updateFullnameSchema.safeParseAsync({
    fullName,
  });
  if (error) return { error: error.issues[0].message };

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        fullName: data.fullName,
      },
    });
  } catch (error) {
    return { error: "An error occurred while updating your full name" };
  }
  revalidatePath("/u/profile");
  return { error: null };
};

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
