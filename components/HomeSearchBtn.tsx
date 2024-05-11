"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const HomeSearchButton = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/product/search?query=${searchQuery}`);
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Search for products"
        className="mt-4 w-[200px] rounded-3xl"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default HomeSearchButton;
