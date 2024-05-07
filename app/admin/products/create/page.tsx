"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const CreateProductPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadBtnClick = () => imageInputRef?.current?.click();
  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  return (
    <main className="mx-2 flex flex-col items-center justify-center gap-4 pb-[5vh] pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[400px] p-4 ">
        <form action="" className="flex w-full flex-col items-center gap-4">
          <h1>Create New Product</h1>
          <Input placeholder="Enter product name" />
          <Input placeholder="Enter product description" />
          <Input placeholder="Enter product price" />
          <Input placeholder="Enter product initial quantity" />
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
            Upload Image <ImageUp size={20} />
          </Button>
          <p className="text-red-500">Error</p>
          <Button className="w-full">Create Product</Button>
        </form>
      </Card>
    </main>
  );
};

export default CreateProductPage;
