import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MR EAGLE (Raymond Henry) — Project Manager, Marketer & Web3 Advisor",
  description:
    "Raymond Henry (MR EAGLE) — Project Manager, Marketer and Advisor specializing in Web3, operations, and growth. Turning complex ideas into clear, practical outcomes across product, operations, and growth.",
  keywords: [
    "Web3",
    "Project Manager",
    "COO",
    "Growth Strategy",
    "Blockchain",
    "DeFi",
    "Product Management",
    "Marketing",
    "Business Development",
    "Africa",
    "Nigeria",
  ],
  authors: [{ name: "Raymond Henry" }],
  openGraph: {
    title: "MR EAGLE — Project Manager, Marketer & Web3 Advisor",
    description:
      "Turning complex ideas into clear, practical outcomes. Project Manager, Marketer and Advisor.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MR EAGLE — Project Manager, Marketer & Advisor",
    description:
      "Turning complex ideas into clear, practical outcomes across product, operations, and growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
