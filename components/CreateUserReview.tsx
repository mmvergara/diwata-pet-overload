import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductReview } from "@/db/productReview";
import { SubmitButton } from "./SubmitBtn";
type Props = {
  productId: string;
};
const CreateUserReview = async ({ productId }: Props) => {
  const session = await auth();
  if (!session) return null;

  const handleSubmitReview = async (formData: FormData) => {
    "use server";
    await createProductReview(formData, productId);
  };
  return (
    <article className="[-2] mb-4 flex flex-row gap-2 rounded-md border-[1px] border-gray-200 p-4">
      <div className="mt-1">
        <Avatar>
          <AvatarImage src={session.user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <form className="grow" action={handleSubmitReview}>
        <div className="mb-2 flex justify-between">
          <div className=" flex w-full items-center gap-2 font-semibold">
            <Textarea name="reviewContent" placeholder="Write a review..." />
          </div>
        </div>
        <Select name="reviewRating">
          <SelectTrigger className="mb-2 w-[200px]">
            <SelectValue placeholder="Rate This Product" defaultValue="5" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Star Rating</SelectItem>
            <SelectItem value="2">2 Star Rating</SelectItem>
            <SelectItem value="3">3 Star Rating</SelectItem>
            <SelectItem value="4">4 Star Rating</SelectItem>
            <SelectItem value="5">5 Star Rating</SelectItem>
          </SelectContent>
        </Select>
        <SubmitButton pendingText="Submitting Review...">
          Submit Review
        </SubmitButton>
      </form>
    </article>
  );
};

export default CreateUserReview;
