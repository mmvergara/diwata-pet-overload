"use client";

import { useFormStatus } from "react-dom";
import { useState, type ComponentProps } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import {
  CheckCheckIcon,
  CircleCheckIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  productID: string;
};

export function AddToCardBtn({ children, productID, ...props }: Props) {
  const session = useSession();
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setAdded(true);
    }, 2000);
  };

  return (
    <Button
      {...props}
      onClick={handleAddToCart}
      disabled={pending || added}
      variant="secondary"
      className={cn(
        `w-full font-semibold`,
        added
          ? `bg-emerald-600 text-white hover:bg-emerald-500`
          : `bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]`,
      )}
    >
      {added
        ? "Added to Cart!"
        : pending
          ? "Adding To Cart . .  ."
          : "Add to Cart"}
      {added ? (
        <CircleCheckIcon size={20} className="ml-2" />
      ) : (
        <ShoppingCartIcon size={16} className="ml-2" />
      )}
    </Button>
  );
}
