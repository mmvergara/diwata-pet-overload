import { Card } from "@/components/ui/card";
import Image from "next/image";

const ProductPage = () => {
  return (
    <main className="flex items-center justify-center flex-wrap gap-4 pt-[10vh] text-white">
      <Card className="p-4 flex sm:flex-row">
        <Image
          src="/hero.jpg"
          width={300}
          height={300}
          alt="hero"
          className="rounded-lg shadow-xl border-orange-300 border-4"
        />
      </Card>
    </main>
  );
};

export default ProductPage;
