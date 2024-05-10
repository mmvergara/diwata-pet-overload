import {
  Bell,
  CircleCheck,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PackageCheck,
  Plus,
  PlusCircle,
  Receipt,
  ReceiptText,
  Settings,
  Star,
  Truck,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser10RecentNotifications } from "@/db/notification";
import { auth } from "@/auth";
import Link from "next/link";

const notificationIcon = {
  NEW_ORDER: <ReceiptText className="mr-2 mt-1 h-5 w-6 text-cyan-800" />,
  NEW_REVIEW: <Star className="mr-2 mt-1 h-5 w-6 text-amber-400" />,
  ORDER_INTRANSIT: <Truck className="mr-2 mt-1 h-5 w-6 text-fuchsia-800" />,
  ORDER_DELIVERED: (
    <PackageCheck className="mr-2 mt-1 h-5 w-6 text-emerald-800" />
  ),
};

export async function NotificationDropdown() {
  const notifications = (await getCurrentUser10RecentNotifications()) || [];
  console.log({ notifications });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-[35px] rounded-full p-[8px] font-bold text-brownPri shadow-md hover:text-brownSec"
        >
          1 <Bell className="h-[15px] w-[15px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuGroup>
          {notifications.map((notif) => {
            switch (notif.type) {
              case "NEW_ORDER":
                return (
                  <Link href={`/u/orders/${notif.contentId}`}>
                    <DropdownMenuItem className="flex cursor-pointer items-start justify-start bg-cyan-200">
                      <ReceiptText className="mr-2 mt-1 h-4 w-4 text-cyan-800" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-black">
                          New Order
                        </span>
                        <span className="text-black-800 text-xs font-medium">
                          {notif.content}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                );

              case "NEW_REVIEW":
                return (
                  <Link href={`/product/${notif.contentId}`}>
                    <DropdownMenuItem className="flex cursor-pointer items-start justify-start bg-amber-200">
                      <Star className="text-black-800 mr-2 mt-1 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-black">
                          New Review
                        </span>
                        <span className="text-black-800 text-xs font-medium">
                          {notif.content}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                );

              case "ORDER_INTRANSIT":
                return (
                  <Link href={`/u/orders/${notif.contentId}`}>
                    <DropdownMenuItem className="flex cursor-pointer items-start justify-start bg-fuchsia-200">
                      <Truck className="mr-2 mt-1 h-4 w-4 text-fuchsia-800" />
                      <div className="flex flex-col">
                        <span className="text-black-900 font-semibold">
                          Order is in Transit
                        </span>
                        <span className="text-black-800 text-xs font-medium">
                          {notif.content}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                );

              case "ORDER_DELIVERED":
                return (
                  <Link href={`/u/orders/${notif.contentId}`}>
                    <DropdownMenuItem className="flex cursor-pointer items-start justify-start bg-emerald-200">
                      <PackageCheck className="mr-2 mt-1 h-4 w-4 text-emerald-800" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-black">
                          Order Delivered
                        </span>
                        <span className="text-black-800 text-xs font-medium">
                          {notif.content}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                );
            }
          })}

          {/* <DropdownMenuItem className="flex items-start justify-start bg-emerald-200">
            <PackageCheck className="mr-2 mt-1 h-4 w-4 text-emerald-800" />
            <div className="flex flex-col">
              <span className="font-semibold text-black">Order #1234</span>
              <span className="text-black-800 text-sm font-medium">
                Your order #qweqweqw has been delivered.
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-start justify-start bg-amber-200">
            <Star className="text-black-800 mr-2 mt-1 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-semibold text-black">New Review</span>
              <span className="text-black-800 text-sm font-medium">
                A New Review for your product has been posted.
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-start justify-start bg-fuchsia-200">
            <Truck className="mr-2 mt-1 h-4 w-4 text-fuchsia-800" />
            <div className="flex flex-col">
              <span className="text-black-900 font-semibold">
                Order is in Transit
              </span>
              <span className="text-black-800 text-sm font-medium">
                Your order #qweqweqw is now in transit.
              </span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-start justify-start bg-gray-200">
            <PackageCheck className="mr-2 mt-1 h-4 w-4 text-gray-800" />
            <div className="flex grow flex-col">
              <p className="flex justify-between">
                <span className="font-semibold text-black">New Order</span>
                <span className="text-xs font-semibold text-gray-700">
                  Read
                </span>
              </p>
              <span className="text-black-800 text-sm font-medium">
                A New Order has been placed.
              </span>
            </div>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
