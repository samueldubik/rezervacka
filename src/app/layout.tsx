import "./globals.css";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervacka",
  description: "Rezervačný systém J9",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
