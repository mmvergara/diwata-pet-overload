"use client";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { CATEGORY } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { dbCategoryToFrontend } from "@/lib/utils";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  initialCategory?: CATEGORY;
  initialQuery?: string;
};

const SearchPageSearch = ({ initialCategory, initialQuery }: Props) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const handleSearchSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    handleSubmitQuery(searchQuery, initialCategory);
  };

  const handleSubmitQuery = (query: string, category?: CATEGORY) => {
    router.push(
      `/product/search?query=${query}&${category ? `category=${category}` : ""}`,
    );
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="mt-4 rounded-md bg-white p-4 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Input
          placeholder="Search for products"
          className=" w-[200px] rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </div>
      <Select
        value={initialCategory}
        onValueChange={(value) => {
          handleSubmitQuery(searchQuery, value as CATEGORY);
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue
            placeholder={
              initialCategory
                ? dbCategoryToFrontend[initialCategory]
                : "Select a category"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(CATEGORY).map((category) => (
              <SelectItem key={category} value={category}>
                {dbCategoryToFrontend[category]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
};

export default SearchPageSearch;
