import { UserCartProducts } from "@/db/cart";
import { CATEGORY } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatNumberComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
