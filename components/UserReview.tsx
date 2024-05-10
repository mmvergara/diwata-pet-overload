import { StarIcon, Trash, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProductReview } from "@prisma/client";
import { SubmitButton } from "./SubmitBtn";
import { deleteProductReview } from "@/db/productReview";

type Props = {
  ProductReview: ProductReview;
  fullName: string;
  avatar: string;
  userId: string;
};
const UserReview = ({ ProductReview, avatar, fullName, userId }: Props) => {
  const { comment, rating, createdAt } = ProductReview;
  const handleDeleteReview = async () => {
    "use server";
    await deleteProductReview(ProductReview.id);
  };
  return (
    <article className="[-2] mb-4 flex flex-row gap-2 rounded-md border-[1px] border-gray-200 p-4">
      <div className="mt-1">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex grow justify-between">
        <div className="flex flex-col">
          <p className="font-semibold">{fullName}</p>
          <div className=" flex items-center gap-2 font-semibold">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  className={`${
                    i < rating ? "text-amber-300" : "text-amber-500"
                  }`}
                  fill="#fbbf24"
                />
              ))}
            </div>
            <span className="font-semibold opacity-50">|</span>
            <span className="text-nowrap text-sm opacity-60">
              {new Date(createdAt).toLocaleDateString()}
            </span>{" "}
          </div>
          <p>{comment}</p>
        </div>
        {userId === ProductReview.userId && (
          <form action={handleDeleteReview}>
            <SubmitButton
              pendingText={<Trash size={16} />}
              className="text-red-500 hover:text-red-600 bg-gray-100 hover:bg-gray-200"
            >
              <Trash2 size={16} />
            </SubmitButton>
          </form>
        )}
      </div>
    </article>
  );
};

export default UserReview;
