import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShopIQ: Shop Smart. Live Better.",
  description:
    "Shop groceries, frozen foods, household essentials, beverages, baby products and more, all in one trusted marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <AppProviders>
          <AnnouncementBar />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
