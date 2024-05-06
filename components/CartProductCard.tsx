"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  onUpdateQuantity: () => void;
  onRemoveProductToCart: () => void;
};

export function CartProductCard() {
  return (
    <Card className="w-[300px] cursor-pointer rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <CardHeader
        className="p-6 pb-2"
        onClick={() => {
          console.log("clicked card");
        }}
      >
        <Image
          src="https://utfs.io/f/5d3ca213-6a52-4733-9be3-6ce3fb82f921-g0gqe4.jpg"
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
      >
        <div className="flex justify-between">
          <p className="font-bold hover:underline">Blue Collar</p>
          <Badge className="bg-brownPri hover:bg-brownSec">₱ 300.00</Badge>
        </div>
        <div className="flex">
          <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
          <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
          <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
          <StarIcon size={16} className="text-amber-300" />
          <StarIcon size={16} className="text-amber-300" />
        </div>
      </CardContent>
      <CardFooter className="flex w-full">
        <Button
          variant="secondary"
          className="bg-btnWhitePri hover:bg-btnWhiteSec w-full font-semibold"
          onClick={() => {
            console.log("clicked add to cart");
          }}
        >
          Add to Cart <ShoppingCartIcon size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
