import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Suspense } from "react";
import FullSpinner from "@/ui/fullSpinner";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${nunito.variable} antialiased text-green-200 overflow-x-hidden`}
      >
        <ClerkProvider>
          <Suspense fallback={<FullSpinner />}>
            <main>{children}</main>
          </Suspense>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}