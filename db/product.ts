"use server";

import prisma from "@/lib/prisma";
import { utapi } from "@/lib/uploadthing";
import { productFormSchema } from "@/lib/zod";
import { CATEGORY } from "@prisma/client";
import { redirect } from "next/navigation";

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

export const getProducts = async (page: number, limit: number = 20) => {
  const products = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  return products;
};

export const getBestSellersProducts = async (
  page: number,
  limit: number = 20,
) => {
  const products = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      sold: "desc",
    },
  });
  return products;
};

export const createProduct = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity"));
  const category = formData.get("category") as CATEGORY;
  const image = (formData.get("image") as File) || null;

  const formValues = { name, description, price, quantity, category, image };
  const { error } = await productFormSchema.safeParseAsync(formValues);
  if (error) return { error: error.issues[0].message };

  let createdProductId = null;
  try {
    // upload to uploadthing
    const [{ data, error }] = await utapi.uploadFiles([image]);
    if (error) return { data: null, error: "Error uploading image" };

    if (!data) return { data: null, error: "Error uploading image" };

    const res = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: quantity,
        category,
        image: data.url,
        sold: 0,
      },
    });
    createdProductId = res.id;
  } catch (error) {
    return { error: "Error creating product" };
  }
  if (createdProductId) redirect(`/product/${createdProductId}`);
  return { error: null };
};

export const updateProductStocksAndSold = async (
  productId: string,
  quantity: number,
) => {
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
        sold: {
          increment: quantity,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

