import { ProductCard } from "@/components/ProductCard";
import SearchPageSearch from "@/components/SearchPageSearch";
import { Button } from "@/components/ui/button";
import { queryProducts } from "@/db/product";
import { CATEGORY } from "@prisma/client";
import Link from "next/link";

const Search = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    category?: CATEGORY;
    page?: string;
  };
}) => {
  const { query, category } = searchParams;
  const page = Number(searchParams.page) || 1;
  const products = await queryProducts(query, page, 20, category);
  const hasMore = products.length === 20;
  const nextPageNum = hasMore ? page + 1 : page;
  const prevPageNum = page - 1 !== 0 ? page - 1 : 1;

  return (
    <main className="p-4">
      <SearchPageSearch initialCategory={category} initialQuery={query} />
      <section className="mb-4 mt-4 flex flex-row flex-wrap justify-around gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}{" "}
      </section>

      <section className="text-center">
        <Link
          href={`/product/search?query=${query}&${category ? `category=${category}` : ""}page=${prevPageNum}`}
        >
          <Button>Previous page</Button>
        </Link>
        {page || 1}
        <Link
          href={`/product/search?query=${query}&${category ? `category=${category}` : ""}page=${nextPageNum}`}
        >
          <Button disabled={hasMore}>Next page</Button>
        </Link>
      </section>
    </main>
  );
};

export default Search;
