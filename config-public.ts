if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  throw new Error("PAYPAL_CLIENT_ID must be set");

export const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
