"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/db/order";
import { ORDERSTATUS } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  orderId: string;
  status: ORDERSTATUS;
};
const OrderUpdateStatus = ({ orderId, status }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdateStatus = async (orderStatus: ORDERSTATUS) => {
    if (isUpdating) return;
    setIsUpdating(true);
    const res = await updateOrderStatus(orderId, orderStatus);
    if (!res) return toast.error("Failed to update status");
    setIsUpdating(false);
    toast.success("Status updated");
  };
  return (
    <Select onValueChange={(v) => handleUpdateStatus(v as ORDERSTATUS)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={isUpdating ? "Updating..." : status}
          defaultValue={status}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(ORDERSTATUS).map((status) => (
            <SelectItem value={status} key={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderUpdateStatus;
