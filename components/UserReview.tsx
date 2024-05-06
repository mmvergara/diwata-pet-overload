import { StarIcon, Trash, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const UserReview = () => {
  return (
    <article className="[-2] mb-4 flex flex-row gap-2 rounded-md border-[1px] border-gray-200 p-4">
      <div className="mt-1">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="font-semibold">Username</p>
            <div className=" flex items-center gap-2 font-semibold">
              <div className="flex">
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" fill="#fbbf24" />
                <StarIcon size={16} className="text-amber-300" />
                <StarIcon size={16} className="text-amber-300" />
              </div>
              <span className="font-semibold opacity-50">|</span>
              <span className="text-nowrap text-sm opacity-60">
                06/05/2024
              </span>{" "}
            </div>
          </div>
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
        <p>
          This is a review comment from a user who bought the product. It's a
          great product and I would recommend it to anyone.
        </p>
      </div>
    </article>
  );
};

export default UserReview;
