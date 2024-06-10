import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import { ClientOnly } from "./components";
import { Navbar } from "./ui";
import RegisterModal from "./ui/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

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
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
