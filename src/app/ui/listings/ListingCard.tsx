"use client";

import { MouseEvent, useMemo } from "react";
import Image from "next/image";
import { useCountries } from "@/app/hooks";
import { SafeUser } from "@/app/types";
import { Listing, Reservation} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { format } from "date-fns";
import { Button, HeartButton } from "@/app/components";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface ListingCardProps{
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard = (
{ data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = " ",
    currentUser
    }: ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);
    
    const handleCancel = useCallback(() => {
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }
    }, [disabled, onAction, actionId])
    
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);


    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        
        return `${format(start, 'PP')} -  ${format(end, 'PP')}`
    },[reservation])
    return (
        <article
            className="group col-span-1 cursor-pointer"
            onClick={()=>router.push('/listings/${data.id')}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                    <Image
                        fill
                        alt="listings"
                        src={data.imageSrc}
                        className="size-full object-cover group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    {formatCurrency(price)}
                    {!reservation && (
                    <div className="font-light"> per night</div>
                )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>               
        </article>
  )
}

export default ListingCard;
