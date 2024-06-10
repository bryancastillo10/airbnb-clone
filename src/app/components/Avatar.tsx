"use client";
import Image from "next/image";

const Avatar = () => {
  return (
      <Image
          src="/images/placeholder.png"
          alt="avatar-photo"
          width="30"
          height="30"
          className="rounded-full"
      />
  )
}

export default Avatar;
