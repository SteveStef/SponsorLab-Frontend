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
        <Toaster
          richColors
          theme="dark"
          toastOptions={{
            style: {
              color: "#ffffff", // Custom text color
              borderRadius: "8px", // Custom border radius
              padding: "16px", // Custom padding
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Custom shadow
              fontSize: "16px",
              duration: 9000,
            },
          }}
        />
    </body>
    </html>
  );
}
