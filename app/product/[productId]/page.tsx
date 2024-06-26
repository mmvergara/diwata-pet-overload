"use server";
import { auth } from "@/auth";
import { AddToCardBtn } from "@/components/AddToCartBtn";
import CopyLinkBtn from "@/components/CopyLinkBtn";
import CreateUserReview from "@/components/CreateUserReview";
import { SubmitButton } from "@/components/SubmitBtn";
import UserReview from "@/components/UserReview";
import { QrCodeDialog } from "@/components/dialogs/QrCodeDialog";
import { Card } from "@/components/ui/card";
import { deleteProductById, getProductById } from "@/db/product";
import {
  currentUserCanReviewProduct,
  getProductRating,
  getProductReviews,
} from "@/db/productReview";
import { dbCategoryToFrontend } from "@/lib/utils";
import { Link, QrCode, StarIcon, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const session = await auth();

  const product = await getProductById(params.productId);
  const canReview = await currentUserCanReviewProduct(params.productId);
  const productRating = await getProductRating(params.productId);
  const productReviews = await getProductReviews(params.productId);
  if (!product) redirect("/home");

  const handleDeleteProduct = async () => {
    "use server";
    await deleteProductById(params.productId);
    redirect("/home");
  };
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
            <p className="w-fit rounded-lg border-[1px] border-gray-200 px-1 text-xs font-bold text-zinc-500 ">
              {dbCategoryToFrontend[category]}
            </p>
            <p className="text-lg font-medium opacity-90">{description}</p>
            <div className="mt-4 flex items-center gap-2 font-semibold">
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
              <CopyLinkBtn
                link={`https://diwata-pet-overload.vercel.app/product/${params.productId}`}
              />
              <QrCodeDialog productId={params.productId} />
              {session?.user.role === "ADMIN" && (
                <form action={handleDeleteProduct}>
                  <SubmitButton
                    pendingText={<Trash size={16} />}
                    className="bg-gray-100 text-red-500 hover:bg-gray-200 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </SubmitButton>
                </form>
              )}
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
        {productReviews.map((review) => (
          <UserReview
            key={review.id}
            ProductReview={review}
            fullName={review.user.fullName}
            avatar={review.user.avatar}
            userId={session?.user.id || ""}
          />
        ))}
      </Card>
    </main>
  );
};

export default ProductPage;
