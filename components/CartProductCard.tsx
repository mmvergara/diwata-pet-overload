"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { Product } from "@prisma/client";
import { toast } from "react-toastify";
import { useEffect } from "react";

type Props = {
  onUpdateQuantity: (
    productId: string,
    add: number,
    forceUpdate?: number,
  ) => void;
  onRemoveProductToCart: (productId: string) => void;
  quantity: number;
  product: Product;
};

export function CartProductCard({
  product,
  quantity,
  onUpdateQuantity,
  onRemoveProductToCart,
}: Props) {
  const { name, image, stock } = product;
  useEffect(() => {
    if (stock === 0) {
      onRemoveProductToCart(product.id);
      toast.error(`${name} is out of stock, removed from cart.`);
    }

    if (quantity > stock) {
      onUpdateQuantity(product.id, 1, stock);
      toast.info(`Quantity of ${name} is updated to ${stock}`);
    }
  }, []);
  return (
    <Card className="w-[250px] cursor-pointer rounded-xl  shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-6 pb-2 pt-[10px]">
        <div className="flex items-center justify-between">
          <p className="font-bold hover:underline">{name}</p>
          <span className="text-xs font-semibold opacity-70">
            Stock {stock}
          </span>
        </div>
        <Image
          src={image}
          width={300}
          height={200}
          alt="Project Image"
          className="rounded-md"
        />
      </CardHeader>
      <CardContent className="p-6 pb-2 pt-0"></CardContent>
      <CardFooter className="flex w-full gap-2">
        <div className="flex grow rounded-md bg-btnWhitePri p-2 text-center text-xs font-medium">
          Quantity: {quantity}
        </div>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
          onClick={() => {
            if (stock > quantity) {
              onUpdateQuantity(product.id, 1);
            } else {
              toast.error("Not enough stock");
            }
          }}
        >
          <CirclePlus className="text-emerald-500 hover:text-emerald-600" />
        </Button>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
          onClick={() => onUpdateQuantity(product.id, -1)}
        >
          <CircleMinus className="text-red-500 hover:text-red-600" />
        </Button>{" "}
        <Button
          onClick={() => onRemoveProductToCart(product.id)}
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
        >
          <Trash2 className="text-red-500 hover:text-red-600" />
        </Button>
      </CardFooter>
    </Card>
  );
}
