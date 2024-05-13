"use client";

import { CircleCheckIcon, ShoppingCartIcon } from "lucide-react";
import { SubmitButton } from "./SubmitBtn";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { addProductToCart } from "@/db/cart";
import { toast } from "react-toastify";

type Props = {
  productID: string;
};

export function AddToCardBtn({ productID }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    const { error } = await addProductToCart(productID);
    if (error) return toast.error(error);
    setAdded(true);
  };

  return (
    <form
      className="flex h-full w-full items-end justify-end"
      action={handleAddToCart}
    >
      <SubmitButton
        pendingText="Adding To Cart . .  ."
        className={cn(
          `w-full font-semibold`,
          added
            ? `bg-emerald-600 text-white hover:bg-emerald-500`
            : `bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]`,
        )}
      >
        {added ? "Added to Cart" : "Add to Cart"}
        {added ? (
          <CircleCheckIcon size={20} className="ml-2" />
        ) : (
          <ShoppingCartIcon size={16} className="ml-2" />
        )}
      </SubmitButton>
    </form>
  );
}
