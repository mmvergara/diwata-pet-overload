import { getCurrentUserData } from "@/db/user";
import { AddAddressDialog } from "@/components/AddAddressDialog";
import { getUserAddresses } from "@/db/address";
import { Separator } from "@/components/ui/separator";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const ProfilePage = async () => {
  const userData = await getCurrentUserData();
  const addressess = await getUserAddresses();
  return (
    <main className="flex flex-wrap items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[1000px] flex-col  items-start p-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p>
          Update your profile information. You can change your name, email, and
          profile picture here.
        </p>
        <Separator className="my-2" />

        <div className="mb-2 flex w-full items-center justify-between rounded-md bg-gray-100 p-2">
          <div>
            <p className="text-md font-semibold">Profile Picture:</p>
            <Image
              src="/hero.jpg"
              width={50}
              height={50}
              alt="hero"
              className="shadow-xl"
            />
          </div>
          <Button variant="outline" className="bg-gray-200 px-[10px]">
            <SquarePen size={16} />
          </Button>
        </div>
        <div className="mb-2 flex w-full items-center justify-between rounded-md bg-gray-100 p-2">
          <div>
            <p className="text-md font-semibold">FullName:</p>
            <p>{userData?.username}</p>
          </div>
          <Button variant="outline" className="bg-gray-200 px-[10px]">
            <SquarePen size={16} />
          </Button>
        </div>
        <div className="mb-2 flex w-full items-center justify-between rounded-md bg-gray-100 p-2">
          <div>
            <p className="text-md font-semibold">Email:</p>
            <p>Sam@gmail.com</p>
          </div>
        </div>
        <div className="flex w-full flex-col rounded-md bg-gray-100 p-2">
          <div className="flex w-full items-center justify-between">
            <div className="mr-auto">
              <p className="text-md font-semibold">Addresses:</p>
            </div>
            <AddAddressDialog />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {addressess &&
              addressess.map((address) => (
                <div
                  key={address.id}
                  className="flex items-center justify-between rounded-md bg-zinc-200 p-2"
                >
                  {address.addressName}
                </div>
              ))}
          </div>
        </div>
      </Card>
    </main>
  );
};

export default ProfilePage;
