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
  const { query, category, page } = searchParams;
  const products = await queryProducts(query, page, 10, category);
  console.log({ query, products });
  return <Link href="/product/search?query=123123">aaa</Link>;
};

export default Search;
