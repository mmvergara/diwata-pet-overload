"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import {
  CircleMinus,
  CircleMinusIcon,
  CirclePlus,
  ShoppingCartIcon,
  StarIcon,
  Trash,
  Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  onUpdateQuantity: () => void;
  onRemoveProductToCart: () => void;
};

export function CartProductCard() {
  return (
    <Card className="w-[250px] cursor-pointer rounded-xl  shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <CardHeader
        className="p-6 pb-2 pt-[10px]"
        onClick={() => {
          console.log("clicked card");
        }}
      >
        <div className="flex items-center justify-between">
          <p className="font-bold hover:underline">Blue Collar</p>
          <span className="text-xs font-semibold opacity-70">Stock 20</span>
        </div>
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
      ></CardContent>
      <CardFooter className="flex w-full gap-2">
        <div className="bg-btnWhitePri flex grow rounded-md p-2 text-center text-xs font-medium">
          Quantity: 12
        </div>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
        >
          <CirclePlus className="text-emerald-500 hover:text-emerald-600" />
        </Button>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
        >
          <CircleMinus className="text-red-500 hover:text-red-600" />
        </Button>{" "}
        <Button
          variant="outline"
          className="h-[30px] w-[30px] rounded-full p-[8px] font-bold text-black"
        >
          <Trash2 className="text-red-500 hover:text-red-600" />
        </Button>
      </CardFooter>
    </Card>
  );
}
