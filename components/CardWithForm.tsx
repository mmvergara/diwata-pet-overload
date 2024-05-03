import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export function CardWithForm() {
  return (
    <Card className="w-[300px] rounded-xl shadow-md">
      <CardHeader className="p-6`">
        <Image
          src="https://utfs.io/f/5d3ca213-6a52-4733-9be3-6ce3fb82f921-g0gqe4.jpg"
          width={300}
          height={200}
          alt="Project Image"
          className="rounded-md"
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="font-bold">Blue Collar</p>
          <Badge variant={"outline"}>₱ 300.00</Badge>
        </div>
        <span className="text-sm font-semibold opacity-70">
          This is a blue collar for your pet. It is made of high quality
        </span>
      </CardContent>
      <CardFooter className="flex w-full">
        <Button
          variant="secondary"
          className="w-full bg-[hsl(240,5%,92%)] hover:bg-[hsl(240,5%,85%)] font-semibold"
        >
          Add to Cart <ShoppingCartIcon size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}