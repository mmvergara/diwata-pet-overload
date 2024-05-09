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
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "../SubmitBtn";
import { updateUserFullName } from "@/db/user";

export function UpdateFullnameDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddAddress = async (formData: FormData) => {
    const res = await updateUserFullName(formData);
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
          <DialogTitle>Update Name</DialogTitle>
        </DialogHeader>
        <form action={handleAddAddress} className="grid flex-1 gap-2">
          <Input
            name="fullName"
            type="text"
            placeholder="New Full Name"
            required
          />
          <p className="text-red-500">{error}</p>
          <SubmitButton pendingText="Saving..." className="max-w-[150px]">
            Save Changes
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
