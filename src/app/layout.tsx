import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen bg-gray-100 ${inter.className}`}>
        <Header />
        <main className="w-screen h-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
