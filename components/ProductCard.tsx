"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { AddToCardBtn } from "./AddToCartBtn";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
  productRating: number;
};

export function ProductCard({ product, productRating }: Props) {
  const { name, price, image, id } = product;
  return (
    <Card className="flex min-h-[333px] w-[300px] cursor-pointer  flex-col rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <Link href={`/product/${id}`}>
        <CardHeader className="p-6 pb-2">
          <Image
            src={image}
            width={200}
            height={200}
            alt="Project Image"
            className="h-[250px] w-[298px] object-cover"
          />
        </CardHeader>
      </Link>
      <Link href={`/product/${id}`}>
        <CardContent className="p-6 pb-2 pt-0">
          <div className="flex  items-start justify-between">
            <p className="text-wrap font-bold hover:underline">{name}</p>
            <Badge className="text-nowrap bg-brownPri text-xs hover:bg-brownSec">
              ₱ {price}
            </Badge>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                size={16}
                className={"text-amber-300"}
                fill={i < productRating ? "#fbbf24" : "transparent"}
              />
            ))}
          </div>
        </CardContent>
      </Link>
      <div className="mt-auto grow p-4 px-6">
        <AddToCardBtn productID={product.id} />
      </div>
    </Card>
  );
}
