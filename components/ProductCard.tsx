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
import Link from "next/link";
import { AddToCardBtn } from "./AddToCartBtn";

export function ProductCard() {
  return (
    <Card className="min-w-[300px] min-h-[333px] rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
      <Link href="/product/1">
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
      </Link>
      <Link href="/product/1">
        <CardContent
          className="p-6 pt-0 pb-2"
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
      </Link>

      <CardFooter className="flex w-full">
        <AddToCardBtn productID="1" />
      </CardFooter>
    </Card>
  );
}
