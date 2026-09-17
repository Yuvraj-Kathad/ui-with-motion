import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Work_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "UX With Motion",
  description: "Premium UI, starting here. Discover 50+ thoughtfully crafted UI components to explore, learn from, and get inspired.",
  openGraph: {
    title: "UX With Motion",
    description: "Premium UI, starting here. Discover 50+ thoughtfully crafted UI components to explore, learn from, and get inspired.",
    siteName: "UX With Motion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${inter.variable} ${workSans.variable} min-h-screen bg-[#FBFCFD] text-[#454545]`}
      >
        {children}
      </body>
    </html>
  );
}
