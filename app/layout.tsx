
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS MongoDB Prisma Starter",
  description: "NextJS MongoDB Prisma Starter with TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
