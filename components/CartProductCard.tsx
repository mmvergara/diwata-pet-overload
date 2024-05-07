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

type Props = {
  onUpdateQuantity: (productId: string, add: number) => void;
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
  return (
    <Card className="w-[250px] cursor-pointer rounded-xl  shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <CardHeader
        className="p-6 pb-2 pt-[10px]"
        onClick={() => {
          console.log("clicked card");
        }}
      >
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
      <CardContent
        className="p-6 pb-2 pt-0"
        onClick={() => {
          console.log("clicked card");
        }}
      ></CardContent>
      <CardFooter className="flex w-full gap-2">
        <div className="flex grow rounded-md bg-btnWhitePri p-2 text-center text-xs font-medium">
          Quantity: {quantity}
        </div>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
          onClick={() => onUpdateQuantity(product.id, 1)}
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
