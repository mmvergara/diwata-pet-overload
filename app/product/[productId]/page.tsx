"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, QrCode, ShoppingCartIcon, StarIcon } from "lucide-react";
import Image from "next/image";

const ProductPage = () => {
  return (
    <main className="flex items-center justify-center flex-wrap gap-4 pt-[10vh] text-white">
      <Card className="p-4 flex flex-col items-center  justify-center  md:items-start md:flex-row w-full max-w-[1000px] gap-4 mx-4 ">
        <Image
          src="/hero.jpg"
          width={300}
          height={300}
          alt="hero"
          className="rounded-lg shadow-xl border-orange-300 border-4"
        />
        <section className="flex flex-col justify-between sm:h-[300px]">
          <div>
            <h2 className="text-3xl font-bold text-brownPri">Blue Collar</h2>

            <p className="text-lg opacity-90 font-medium">
              This blue collar is made from the finest materials and is perfect,
              whether you're going to a party or just hanging out with friends.
              It's a must-have for any wardrobe.
            </p>
            <div className="flex items-center mt-4 font-semibold gap-2">
              <div className="flex">
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" />
                <StarIcon size={16} className="text-amber-300" />
              </div>
              <span className="font-semibold opacity-50">|</span>
              <span className="opacity-60 text-sm text-nowrap">
                20 Stock Available
              </span>{" "}
              <span className="font-semibold opacity-50">|</span>
              <span className="opacity-60 text-sm text-nowrap">20 sold</span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-2xl font-semibold ">₱ 300.00</p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="w-full  bg-[hsl(240,5%,92%)] hover:bg-[hsl(240,5%,85%)] font-semibold"
                onClick={() => {
                  console.log("clicked add to cart");
                }}
              >
                Add to Cart <ShoppingCartIcon size={16} className="ml-2" />
              </Button>
              <Button className="bg-[hsl(240,5%,92%)] hover:bg-[hsl(240,5%,85%)] text-black">
                <Link className="p-[2px]" />
              </Button>{" "}
              <Button className="bg-[hsl(240,5%,92%)] hover:bg-[hsl(240,5%,85%)] text-black">
                <QrCode className="p-[2px]" />
              </Button>
            </div>
          </div>
        </section>
      </Card>
    </main>
  );
};

export default ProductPage;
