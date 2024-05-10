"use server";
import { AddToCardBtn } from "@/components/AddToCartBtn";
import CreateUserReview from "@/components/CreateUserReview";
import UserReview from "@/components/UserReview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProductById } from "@/db/product";
import { currentUserCanReviewProduct } from "@/db/productReview";
import { Link, QrCode, StarIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductById(params.productId);
  const canReview = await currentUserCanReviewProduct(params.productId);
  if (!product) redirect("/home");
  const { name, description, price, stock, category, image, sold } = product;
  return (
    <main className="flex flex-wrap items-center justify-center gap-4 pt-[3vh] text-white">
      <Card className="mx-4 flex w-full max-w-[1000px] flex-col items-center  gap-4 p-4 md:flex-row md:items-start">
        <Image
          src={image}
          width={300}
          height={300}
          alt="hero"
          className="rounded-lg border-4 border-orange-300 shadow-xl"
        />
        <div className="flex grow flex-col justify-between sm:h-[300px]">
          <div>
            <h2 className="text-3xl font-bold text-brownPri">{name}</h2>

            <p className="text-lg font-medium opacity-90">{description}</p>
            <div className="mt-4 flex items-center gap-2 font-semibold">
              <div className="flex">
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" />
                <StarIcon size={16} className="text-amber-300" />
              </div>
              <span className="font-semibold opacity-50">|</span>
              <span className="text-nowrap text-sm opacity-60">
                {stock} Stock Available
              </span>{" "}
              <span className="font-semibold opacity-50">|</span>
              <span className="text-nowrap text-sm opacity-60">
                {sold} Sold
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-2xl font-semibold ">₱ {price}.00</p>
            <div className="flex gap-2">
              <AddToCardBtn productID={params.productId} />
              <Button className="bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]">
                <Link className="p-[2px]" />
              </Button>
              <Button className="bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]">
                <QrCode className="p-[2px]" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="mx-4 mb-10 flex w-full max-w-[1000px] flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-brownPri">Reviews:</h2>
        <p className="mb-6 font-medium opacity-70">
          Here are some reviews from customers who have bought the product.
        </p>
        {canReview && <CreateUserReview productId={params.productId} />}
        <UserReview />

      </Card>
    </main>
  );
};

export default ProductPage;
