"use client";

import { Avatar } from "@/app/components";
import { useCountries } from "@/app/hooks";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../../components/Map'), {
    ssr: false 
});

interface ListingInfoProps{
    user: SafeUser;
    category: { icon: IconType, label: string; description: string; } | undefined;
    locationValue: string;
    description: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
}

const ListingInfo = ({
    user,
    category,
    description,
    locationValue,
    roomCount,
    bathroomCount,
    guestCount,   
}: ListingInfoProps) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-md font-semibold flex flex-row items-center gap-2">
                <Avatar
                    userImage={user?.image}
                />
                <div>
                  Hosted by <span className="text-rose-500">{user?.name}</span>
                </div>
              </div>
               <article className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                      {guestCount} guests    
                    </div>
                    <div>
                       {roomCount} rooms   
                    </div>
                    <div>
                       {bathroomCount} bathrooms   
                    </div>  
              </article>
              <hr />
              {category &&
                  (<ListingCategory
                      icon={category.icon}
                      label={category.label}
                      description={category.description}
                    />)}
              <hr />
              <div className="text-lg font-light text-neutral-500">
                  {description}
              </div>
              <hr />
                  <h1 className="text-md">Country</h1>
                  <Map center={coordinates} />

          </div>
    </div>
  )
}

export default ListingInfo
