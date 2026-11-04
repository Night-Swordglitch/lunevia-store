import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shoplunevia.vercel.app"),
  title: {
    default: "LUNÉVIA | Elevate the Everyday",
    template: "%s | LUNÉVIA",
  },
  description:
    "Discover thoughtfully selected pieces for beauty, comfort and inspiration in everyday living.",
  openGraph: {
    type: "website",
    siteName: "LUNÉVIA",
    title: "LUNÉVIA | Elevate the Everyday",
    description:
      "Discover thoughtfully selected pieces for beauty, comfort and inspiration in everyday living.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUNÉVIA | Elevate the Everyday",
    description:
      "Discover thoughtfully selected pieces for beauty, comfort and inspiration in everyday living.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CurrencyProvider>
          <CartProvider>
            {children}
            <SiteFooter />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
