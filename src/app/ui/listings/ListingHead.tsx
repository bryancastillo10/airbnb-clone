"use client";

import { useCountries } from "@/app/hooks";
import { SafeUser } from "@/app/types";
import { Heading, HeartButton } from "@/app/components";
import Image from "next/image";

interface ListingHeadProps{
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({ id, title, locationValue,imageSrc, currentUser}:ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} , ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-lg relative my-8">
        <Image alt="individual-listing"
          src={imageSrc}
          className="object-fit lg:object-cover w-full"
          fill
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead
