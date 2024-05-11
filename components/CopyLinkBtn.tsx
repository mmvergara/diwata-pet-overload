"use client";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

type Props = {
  link: string;
};
const CopyLinkBtn = ({ link }: Props) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };
  return (
    <Button
      className="bg-[hsl(240,5%,92%)] text-black hover:bg-[hsl(240,5%,85%)]"
      type="button"
      onClick={handleCopyLink}
    >
      <Link className="p-[2px]" />
    </Button>
  );
};

export default CopyLinkBtn;
