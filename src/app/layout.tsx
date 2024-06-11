import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import { ClientOnly } from "./components";
import { Navbar } from "./ui";
import RegisterModal from "./ui/modal/RegisterModal";
import LoginModal from "./ui/modal/LoginModal";
import RentModal from "./ui/modal/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({subsets:["latin"]})

export const metadata: Metadata = {
  title: "AirBnB Clone",
  description: "E-commerce AirBnb Clone Project",
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
          <LoginModal />
          <RentModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
