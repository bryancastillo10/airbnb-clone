"use client";
import { useCallback, useState } from "react";
import { Avatar } from "@/app/components";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { useLoginModal, useRegisterModal, useRentModal } from "@/app/hooks";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps{
    currentUser?: SafeUser | null;
}

const UserMenu = ({currentUser}: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  
    const toggleOpen = useCallback(() => {
        setOpenMenu(val => !val)
    }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    
    // Open Rent Modal
    rentModal.onOpen()
  }, [currentUser,loginModal,rentModal])
  return (
      <div className="relative">
          <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-gray-200 transition cursor-pointer"
             onClick={onRent}>
                      Airbnb Your Home
              </div>
              <div className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                      <Avatar userImage={currentUser?.image}/>
                  </div>
              </div>
          </div>
          {openMenu && ( 
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-[#f4f3f2] overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                      {currentUser ? (
                         <>
                        <MenuItem onClick={() => router.push("/trips")} label="My Trips" />
                        <MenuItem onClick={() => { }} label="My Favorites" />
                        <MenuItem onClick={() => { }} label="My Properties" />
                        <MenuItem onClick={() => router.push("/reservations")} label="My Reservations" />
                        <MenuItem onClick={rentModal.onOpen} label="Airbnb my Home" />
                        <hr />
                        <MenuItem onClick={() => signOut()} label="Logout" />      
                      </>

                      ): (
                        <>
                        <MenuItem onClick={loginModal.onOpen} label="Login" />
                        <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                        <MenuItem onClick={() => { }} label="Settings" />
                      </>
                    )}
                  </div>
            </div>
          )}
          </div>
  )
}

export default UserMenu;
