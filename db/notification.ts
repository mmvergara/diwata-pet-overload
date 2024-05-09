import prisma from "@/lib/prisma";
import { getAllAdminsUserId } from "./user";

export const sendNewOrderStatusNotification = async (
  userId: string,
  orderId: string,
  status: "ORDER_INTRANSIT" | "ORDER_DELIVERED",
) => {
  await prisma.notification.create({
    data: {
      title: "Order Status",
      content: `Your order with id ${orderId} is now ${status}.`,
      type: status,
      userId: userId,
      contentId: orderId,
    },
  });
};

export const sendNewOrderNotification = async (orderId: string) => {
  const adminsUserIds = await getAllAdminsUserId();
  await prisma.notification.createMany({
    data: adminsUserIds.map((userId) => ({
      title: "New Order",
      content: `New order with id ${orderId} has been placed.`,
      type: "NEW_ORDER",
      userId: userId,
      contentId: orderId,
    })),
  });
};

export const sendNewReviewNotification = async (reviewId: string) => {
  const adminsUserIds = await getAllAdminsUserId();
  await prisma.notification.createMany({
    data: adminsUserIds.map((userId) => ({
      title: "New Review",
      content: `New review with id ${reviewId} has been posted.`,
      type: "NEW_REVIEW",
      userId: userId,
      contentId: reviewId,
    })),
  });
};
