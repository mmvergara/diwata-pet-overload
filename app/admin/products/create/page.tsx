"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { dbCategories, dbCategoryToFrontend } from "@/lib/utils";
import { createProduct } from "@/db/product";
import { SubmitButton } from "@/components/SubmitBtn";

const CreateProductPage = () => {
  const [error, setError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageUploadBtnClick = () => imageInputRef?.current?.click();
  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddProduct = async (formData: FormData) => {
    setError("");
    const { error } = await createProduct(formData);
    if (error) setError(error);
  };

  return (
    <main className="mx-2 flex flex-col items-center justify-center gap-4 pb-[5vh] pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[400px] p-4 ">
        <form
          action={handleAddProduct}
          className="flex w-full flex-col items-center gap-4"
        >
          <h1 className="font-bold">Create New Product</h1>
          <Input type="text" name="name" placeholder="Enter product name" />
          <Input
            type="text"
            name="description"
            placeholder="Enter product description"
          />
          <Input type="number" name="price" placeholder="Enter product price" />
          <Input
            type="number"
            name="quantity"
            placeholder="Quantity (quantity can be updated later)"
          />
          <Select name="category">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {dbCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {dbCategoryToFrontend[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!!imagePreview && (
            <Image
              src={imagePreview}
              alt="image preview"
              width={300}
              height={300}
            />
          )}
          <input
            ref={imageInputRef}
            hidden
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png"
            alt="image input"
            onChange={handleImageInputChange}
          />
          <Button
            onClick={handleImageUploadBtnClick}
            className="flex w-full gap-2"
            variant="outline"
            type="button"
          >
            {imagePreview ? "Change Image" : "Upload Image"}
            <ImageUp size={20} />
          </Button>
          <p className="text-red-500">{error}</p>
          <SubmitButton pendingText="Creating product...">
            Create Product
          </SubmitButton>
        </form>
      </Card>
    </main>
  );
};

export default CreateProductPage;
