"use client";
import Image from "next/image";

interface AvatarProps{
  userImage?: string | null | undefined;
}

const Avatar = ({userImage}:AvatarProps) => {
  return (
      <Image
          src={userImage || "/images/placeholder.png"}
          alt="avatar-photo"
          width="30"
          height="30"
          className="rounded-full"
      />
  )
}

export default Avatar;
