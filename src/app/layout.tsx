import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burcu & Alperen | Davetiye",
  description: "Burcu ve Alperen'in dijital nikah ve düğün davetiyesi"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
