import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import Header from "@/components/Header";
import ico from "../../public/favico.ico";
import ToastProvider from "@/components/ToastProvider";
import ToastShelf from "@/components/ToastShelf";

export const metadata: Metadata = {
  title: "Tapiceria Nautica",
  description: "Backoffice administrativo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href={ico.src} sizes="any" />
      </head>
      <NextAuthProvider>
        <ToastProvider>
          <body>
            <Header />
            {children}
            <ToastShelf />
          </body>
        </ToastProvider>
      </NextAuthProvider>
    </html>
  );
}
