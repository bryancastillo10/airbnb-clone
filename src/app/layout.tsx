import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui";

const font = Nunito({subsets:["latin"]})

export const metadata: Metadata = {
  title: "AirBnB Clone",
  description: "E-commerce AirBnb Clone Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
