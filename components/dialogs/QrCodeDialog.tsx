import { QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export function QrCodeDialog({ productId }: { productId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]">
          <QrCode className="p-[2px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QRCode for this product</DialogTitle>
        </DialogHeader>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://diwata-pet-overload.vercel.app/product/${productId}`}
          alt="qr-code"
          width={150}
          height={150}
        />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
