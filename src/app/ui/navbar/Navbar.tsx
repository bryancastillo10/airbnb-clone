"use client";

import { Container } from "../../components";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-[#f4f3f2] z-10 shadow-sm">
    <div className="py-4 border-b">
              <Container>
                  <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenu/>
                  </div>
              </Container>
     </div>
    </nav>
  )
}

export default Navbar;
