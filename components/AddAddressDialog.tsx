"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SquarePlus } from "lucide-react";

export function AddAddressDialog() {
  const handleAddAddress = () => {
    // Add Address Logic
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-200 px-[10px]">
          <SquarePlus size={16} />
        </Button>
      </DialogTrigger>
      <form action={handleAddAddress}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Address</DialogTitle>
            <DialogDescription>
              Add a new address to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid flex-1 gap-2">
            <Input type="text" placeholder="Address Name" required />
            <Input type="text" placeholder="Full Address" required />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button">Submit Address</Button>{" "}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
