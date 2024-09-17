import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AppWrapper } from "@/context";
import { Suspense } from "react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SponsorLab",
  description: "Building the bridge between sponsors and youtubers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Suspense>
          <AppWrapper>
            {children}
          </AppWrapper>
            </Suspense>
        <Toaster richColors />
    </body>
    </html>
  );
}
