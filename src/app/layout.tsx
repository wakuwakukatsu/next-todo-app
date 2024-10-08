import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDoアプリ",
  description: "ToDoアプリです。",
  openGraph: {
    title: "ToDoアプリ",
    description: "ToDoアプリです。",
    url: "https://next-todo-app-omega-three.vercel.app/",
    siteName: "ToDoアプリ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
