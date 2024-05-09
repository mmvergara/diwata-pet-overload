"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createUserAddress } from "@/db/address";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "../SubmitBtn";

export function AddAddressDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddAddress = async (formData: FormData) => {
    const res = await createUserAddress(formData);
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
          <SquarePlus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Address</DialogTitle>
          <DialogDescription>
            Add a new address to your account.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAddAddress} className="grid flex-1 gap-2">
          <Input
            name="addressName"
            type="text"
            placeholder="Address Name"
            required
          />
          <Input
            name="fullAddress"
            type="text"
            placeholder="Full Address"
            required
          />
          <p className="text-red-500">{error}</p>

          <SubmitButton pendingText="Submitting..." className="max-w-[150px]">
            Submit Address
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
