import { ProductCard } from "@/components/ProductCard";
import { StarsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/db/product";

export default async function Home() {
  const products = await getProducts(1);
  return (
    <div className=" mb-[80px] bg-orange-100">
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
          <Input
            placeholder="Search for products"
            className="mt-4 w-[200px] rounded-3xl"
          />
        </div>
      </section>
      <div className="mb-4 flex items-center justify-center px-8 font-semibold ">
        <p className="flex w-max gap-2 rounded-md bg-white bg-gradient-to-t from-amber-400 to-orange-500 p-4 py-2 text-white">
          <StarsIcon /> Best Sellers
          <StarsIcon />
        </p>
      </div>
      <section className="mb-10 flex flex-row flex-wrap justify-center gap-10 px-4 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <div className="text-md mb-4 flex items-center justify-center px-8 font-semibold ">
        <p className="flex w-max gap-2 rounded-md bg-white bg-gradient-to-t from-amber-400 to-orange-500 p-4 py-2 text-white">
          <StarsIcon /> Recommended For You
          <StarsIcon />
        </p>
      </div>
      <section className="mb-4 flex flex-row flex-wrap justify-center gap-10 px-4 "></section>
    </div>
  );
}
