"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { AddToCardBtn } from "./AddToCartBtn";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { name, price, image } = product;
  return (
    <Card className="min-h-[333px] min-w-[300px] cursor-pointer rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <Link href="/product/1">
        <CardHeader
          className="p-6 pb-2"
          onClick={() => {
            console.log("clicked card");
          }}
        >
          <Image
            src={image}
            width={300}
            height={300}
            alt="Project Image"
            className="rounded-md"
          />
        </CardHeader>
      </Link>
      <Link href="/product/1">
        <CardContent
          className="p-6 pb-2 pt-0"
          onClick={() => {
            console.log("clicked card");
          }}
        >
          <div className="flex justify-between">
            <p className="font-bold hover:underline">{name}</p>
            <Badge className="bg-brownPri hover:bg-brownSec">
              ₱ {price}.00
            </Badge>
          </div>
          <div className="flex">
            <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
            <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
            <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
            <StarIcon size={16} className="text-amber-300" />
            <StarIcon size={16} className="text-amber-300" />
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex w-full">
        <AddToCardBtn productID={product.id} />
      </CardFooter>
    </Card>
  );
}
