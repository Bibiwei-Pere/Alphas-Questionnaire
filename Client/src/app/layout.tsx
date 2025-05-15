import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alphas - Questionnaire",
  description: "Questionnaire Forms",
  keywords: "Questionnaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
