import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import { ClientOnly } from "./components";
import { Navbar } from "./ui";

import RegisterModal from "./ui/modal/RegisterModal";
import LoginModal from "./ui/modal/LoginModal";
import RentModal from "./ui/modal/RentModal";
import SearchModal from "./ui/modal/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";
import { getCurrentUser } from "./actions";


const font = Nunito({subsets:["latin"]})
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "AirBnB Clone",
  description: "E-commerce AirBnb Clone Project",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/icons/airbnb.ico",
        href: "/icons/airbnb.ico"
      },
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal/>
          <LoginModal />
          <RentModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
