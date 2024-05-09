"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ImageUp, SquarePen } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitButton } from "../SubmitBtn";
import { updateAvatar, updateUserFullName } from "@/db/user";
import Image from "next/image";

export function UpdateAvatarDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageUploadBtnClick = () => imageInputRef?.current?.click();
  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  const handleUpdateAvatar = async (formData: FormData) => {
    const res = await updateAvatar(formData);
    if (res.error) return setError(res.error);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="bg-gray-200 px-[10px]"
        >
          <SquarePen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Avatar</DialogTitle>
        </DialogHeader>
        <form
          action={handleUpdateAvatar}
          className="flex w-full flex-col items-center gap-4"
        >
          {!!imagePreview && (
            <Image
              src={imagePreview}
              alt="image preview"
              width={150}
              height={150}
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
          <SubmitButton pendingText="Saving...">Save Changes</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
