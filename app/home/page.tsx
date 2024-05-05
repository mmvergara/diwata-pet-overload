import { ProductCard } from "@/components/ProductCard";
import { StarsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Home() {
  return (
    <div className=" bg-orange-100 drop-shadow-lg shadow-xl min-h-[120vh]">
      <section className="flex flex-col items-center relative overflow-hidden border-white h-[250px]">
        <div className="blur-xl bg-gradient-to-t from-amber-200 to-orange-500 h-[250px] top-[-35px] w-[120vw] absolute "></div>
        <div className="absolute flex flex-col items-center">
          <h1 className="text-lg text-center sm:text-5xl text-white rounded-sm font-bold text-shadow">
            <br />
            <span className="font-extrabold text-white">
              Diwata Pet Accessories
            </span>
          </h1>
          <p className="text-center text-white font-semibold">
            Shop the Finest Selection of Handcrafted Pet Accessories Online
          </p>
          <Input
            placeholder="Search for products"
            className="rounded-3xl w-[200px] mt-4"
          />
        </div>
      </section>
      <div className="flex items-center justify-center mb-4 font-semibold px-8 ">
        <p className="bg-white flex gap-2 w-max p-4 rounded-md py-2 bg-gradient-to-t from-amber-400 to-orange-500 text-white">
          <StarsIcon /> Best Sellers
          <StarsIcon />
        </p>
      </div>
      <section className="flex flex-row flex-wrap justify-center gap-10 mb-10 px-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
      <div className="flex items-center justify-center text-md mb-4 font-semibold px-8 ">
        <p className="bg-white flex gap-2 w-max p-4 rounded-md py-2 bg-gradient-to-t from-amber-400 to-orange-500 text-white">
          <StarsIcon /> Recommended For You
          <StarsIcon />
        </p>
      </div>
      <section className="flex flex-row justify-center gap-10 mb-4 flex-wrap px-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
}
