if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be set");
if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET must be set");
if (!process.env.UPLOADTHING_SECRET)
  throw new Error("UPLOADTHING SECRET must be set");
if (!process.env.UPLOADTHING_APP_ID)
  throw new Error("UPLOADTHING_APP_ID must be set");
if (!process.env.PAYPAL_CLIENT_ID)
  throw new Error("PAYPAL_CLIENT_ID must be set");

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export const DATABASE_URL = process.env.DATABASE_URL;
export const AUTH_SECRET = process.env.AUTH_SECRET;
export const UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET;
export const UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID;

export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
