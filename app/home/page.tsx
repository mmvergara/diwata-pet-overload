import { ProductCard } from "@/components/ProductCard";
import { StarsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { get20RandomProducts, getBestSellersProducts } from "@/db/product";
import HomeSearchButton from "@/components/HomeSearchBtn";

export default async function Home() {
  const bestSellerProducts = await getBestSellersProducts(1, 10);
  const recommendedProducts = await get20RandomProducts();
  return (
    <div className="mb-[80px] bg-orange-100">
      <section className="relative flex h-[250px] flex-col items-center overflow-hidden border-white">
        <div className="absolute top-[-35px] h-[250px] w-[120vw] bg-gradient-to-t from-amber-200 to-orange-500 blur-xl "></div>
        <div className="absolute flex flex-col items-center">
          <h1 className="text-shadow rounded-sm text-center text-lg font-bold text-white sm:text-5xl">
            <br />
            <span className="font-extrabold text-white">
              Diwata Pet Overload
            </span>
          </h1>
          <p className="text-center font-semibold text-white">
            Shop the Finest Selection of Pet Accessories Online
          </p>
          <HomeSearchButton />
        </div>
      </section>
      <div className="mb-4 flex items-center justify-center px-8 font-semibold ">
        <p className="flex w-max gap-2 rounded-md bg-white bg-gradient-to-t from-amber-400 to-orange-500 p-4 py-2 text-white">
          <StarsIcon /> Best Sellers
          <StarsIcon />
        </p>
      </div>
      <section className="mb-10 flex flex-row flex-wrap justify-center gap-10 px-4 ">
        {bestSellerProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            productRating={
              product.reviews
                .map((review) => review.rating)
                .reduce((a, b) => a + b, 0) / product.reviews.length
            }
          />
        ))}
      </section>
      <div className="text-md mb-4 flex items-center justify-center px-8 font-semibold ">
        <p className="flex w-max gap-2 rounded-md bg-white bg-gradient-to-t from-amber-400 to-orange-500 p-4 py-2 text-white">
          <StarsIcon /> Recommended For You
          <StarsIcon />
        </p>
      </div>
      <section className="mb-4 flex flex-row flex-wrap justify-center gap-10 px-4 ">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            productRating={
              product.reviews
                .map((review) => review.rating)
                .reduce((a, b) => a + b, 0) / product.reviews.length
            }
          />
        ))}
      </section>
    </div>
  );
}
