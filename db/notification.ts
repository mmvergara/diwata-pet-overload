import prisma from "@/lib/prisma";
import { getAllAdminsUserId } from "./user";
import { auth } from "@/auth";

export const getCurrentUser10RecentNotifications = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    return await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  } catch (error) {
    return null;
  }
};

export const sendNewOrderStatusNotification = async (
  userId: string,
  orderId: string,
  status: "ORDER_INTRANSIT" | "ORDER_DELIVERED",
) => {
  await prisma.notification.create({
    data: {
      //  pascal case to human readable
      title: `${status === "ORDER_INTRANSIT" ? "Order is in Transit" : "Order Delivered"}`,
      content: `OrderID: #${orderId}`,
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
      content: `New order #${orderId} has been placed.`,
      type: "NEW_ORDER",
      userId: userId,
      contentId: orderId,
    })),
  });
};

export const sendNewReviewNotification = async (
  reviewId: string,
  productName: string,
) => {
  const adminsUserIds = await getAllAdminsUserId();
  await prisma.notification.createMany({
    data: adminsUserIds.map((userId) => ({
      title: "New Review",
      content: `New review for ${productName} has been posted.`,
      type: "NEW_REVIEW",
      userId: userId,
      contentId: reviewId,
    })),
  });
};
