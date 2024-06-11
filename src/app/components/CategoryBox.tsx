"use client";

import { IconType } from "react-icons";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";

interface CategoryBoxProps{
    label: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox = ({label,icon:Icon,selected}:CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());          
        }
        
        const updatedQuery: any = {
            ...currentQuery,
            category:label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
        
        const url = queryString.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true }
        );

        router.push(url);
    }, [label,params,router]);
    return (
    <div   onClick={handleClick}
           className={`flex flex-col justify-center items-center 
           p-3 gap-2 border-b-2 hover:text-neutral-800 transition cursor-pointer
           ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}`}>
          <Icon size={26} />
          <div className="font-medium text-sm">
             {label} 
          </div>
    </div>
  )
}

export default CategoryBox
