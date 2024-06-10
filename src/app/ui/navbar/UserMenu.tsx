"use client";
import { useCallback, useState } from "react";
import { Avatar } from "@/app/components";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";

const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const toggleOpen = useCallback(() => {
        setOpenMenu(val => !val)
    }, []);

  return (
      <div className="relative">
          <div className="flex flex-row items-center gap-3">
              <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={()=>{}}>
                 AirBnB your home 
              </div>
              <div className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                      <Avatar/>
                  </div>
              </div>
          </div>
          {openMenu && ( 
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-[#f4f3f2] overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                      <>
                        <MenuItem onClick={() => { }} label="Login" />
                        <MenuItem onClick={() => { }} label="Sign up" />
                        <MenuItem onClick={() => { }} label="Settings" />
                      </>
                  </div>
            </div>
          )}
          </div>
  )
}

export default UserMenu;
