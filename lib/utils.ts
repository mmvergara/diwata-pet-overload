import { UserCartProducts } from "@/db/cart";
import { CATEGORY, ORDERSTATUS } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatNumberComma = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const strToBase64 = (str: string) => {
  return Buffer.from(str).toString("base64");
};

export const dbCategories = Object.values(CATEGORY);
export const dbCategoryToFrontend = {
  COLLARSANDLEASHES: "Collars & Leashes",
  TOYS: "Toys",
  APPAREL: "Apparel",
  BEDDING: "Bedding",
  FOODANDBOWLS: "Food & Bowls",
  TRAVELACCESSORIES: "Travel Accessories",
  GROOMING: "Grooming",
  HEALTHANDWELLNESS: "Health & Wellness",
  TRAININGAIDS: "Training Aids",
  IDTAGS: "ID Tags",
};

export const StatusColors: {
  [key in ORDERSTATUS]: string;
} = {
  PENDING: "bg-yellow-500",
  INTRANSIT: "bg-blue-500",
  DELIVERED: "bg-green-500",
};
