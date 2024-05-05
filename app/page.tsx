import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-wrap items-start justify-center p-8 sm:gap-10 sm:p-20">
      <section>
        <Image
          alt="hero"
          src="/hero.jpg"
          className="rounded-lg border-4 border-orange-300 shadow-xl"
          width={300}
          height={300}
        />
      </section>
      <section className="p-4 pt-0">
        <h1 className="text-shadow rounded-sm text-lg font-bold text-black sm:text-5xl">
          <span className="text-sm">Elevate Your Pet's Style with</span>
          <br />
          <span className="bg-gradient-to-r from-orange-600 to-amber-300 bg-clip-text font-extrabold text-transparent">
            Diwata Pet Accessories
          </span>
        </h1>
        <p>Shop the Finest Selection of Handcrafted Pet Accessories Online</p>
        <div className="mt-8">
          <Button className="rounded-3xl bg-amber-700 px-4 py-2 font-bold text-white hover:bg-amber-600">
            <Link href="/home">Shop Now</Link>
          </Button>
          <Button
            variant="link"
            className="rounded px-4 py-2 font-bold text-amber-700"
          >
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
