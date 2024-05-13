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

export const queryProducts = async (
  query: string = "",
  page: number = 1,
  limit: number = 20,
  category?: CATEGORY,
) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
      category,
    },
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    skip: (Number(page) - 1) * limit,
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
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });
  return products;
};

export const deleteProductById = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
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

export const get20RandomProducts = async () => {
  const products = await prisma.product.findMany({
    take: 20,
    orderBy: {
      id: "desc",
    },
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });
  if (!products) return [];
  return products.sort(() => Math.random() - 0.5);
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
