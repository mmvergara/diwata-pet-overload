import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="p-8 sm:p-20 flex items-start justify-center sm:gap-10 flex-wrap">
      <section>
        <Image
          alt="hero"
          src="/hero.jpg"
          className="rounded-lg shadow-xl border-orange-300 border-4"
          width={300}
          height={300}
        />
      </section>
      <section className="p-4 pt-0">
        <h1 className="text-lg sm:text-5xl text-black rounded-sm font-bold text-shadow">
          <span className="text-sm">Elevate Your Pet's Style with</span>
          <br />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-amber-300 from-orange-600">
            Diwata Pet Accessories
          </span>
        </h1>
        <p>Shop the Finest Selection of Handcrafted Pet Accessories Online</p>
        <div className="mt-8">
          <Button className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-3xl">
            <Link href="/home">Shop Now</Link>
          </Button>
          <Button
            variant="link"
            className="text-amber-700 font-bold py-2 px-4 rounded"
          >
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
