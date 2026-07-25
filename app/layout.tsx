import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riddhesh More | Portfolio",
  description: "Minimal animated portfolio for robotics, AI, and ML projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
