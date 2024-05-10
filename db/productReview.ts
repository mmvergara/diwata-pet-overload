"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { reviewFormSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { userHasBoughtProduct } from "./userBoughtProduct";

export const getProductReviews = async (productId: string) => {
  try {
    const reviews = await prisma.productReview.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            fullName: true,
            avatar: true,
          },
        },
      },
    });
    return reviews;
  } catch (error) {
    return [];
  }
};

export type ProductReviewWithUsers = Awaited<
  ReturnType<typeof getProductReviews>
>;

export const deleteProductReview = async (reviewId: string) => {
  const session = await auth();
  if (!session) return { error: "You must be logged in to delete a review." };
  try {
    const res = await prisma.productReview.delete({
      where: {
        id: reviewId,
        userId: session.user.id,
      },
    });
    revalidatePath(`/product/${res.productId}`);
  } catch (error) {
    console.log(error);
    return { error: "Error deleting review" };
  }
  return { error: null };
};

export const currentUserCanReviewProduct = async (productId: string) => {
  const session = await auth();
  if (!session) return false;
  const userHasReviewedProduct = await prisma.productReview.findFirst({
    where: {
      productId,
      userId: session.user.id,
    },
  });
  if (userHasReviewedProduct) return false;

  if (await userHasBoughtProduct(session.user.id, productId)) {
    return true;
  }
  console.log("User has not bought product");
  return false;
};

export const createProductReview = async (
  formData: FormData,
  productId: string,
) => {
  const session = await auth();
  if (!session) return { error: "You must be logged in to leave a review." };
  const reviewContent = formData.get("reviewContent") as string;
  const reviewRating = Number(formData.get("reviewRating"));

  const { error } = await reviewFormSchema.safeParseAsync({
    reviewContent,
    reviewRating,
  });

  if (error) return { error: error.issues[0].message };

  try {
    await prisma.productReview.create({
      data: {
        comment: reviewContent,
        rating: reviewRating,
        productId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error creating review" };
  }
  revalidatePath(`/product/${productId}`);
  return { error: null };
};
