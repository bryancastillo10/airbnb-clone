"use client";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { categories } from "@/app/constants";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Container } from "@/app/components";
import { useLoginModal } from "@/app/hooks";


import ListingHead from "@/app/ui/listings/ListingHead";
import ListingInfo from "@/app/ui/listings/ListingInfo";
import ListingReservation from "@/app/ui/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface IndividualListingProps{
    reservations?: SafeReservation[];
    listing: SafeListing & { user: SafeUser};
    currentUser?: SafeUser | null;
}

const IndividualListing = ({
    listing,
    currentUser,
    reservations = []
}: IndividualListingProps) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];  
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations])
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                // Redirect to /trips
                router.refresh();
            })
            .catch(() => {
            toast.error('Error, something went wrong!')
            })
            .finally(() => {
                setIsLoading(false);
        })

    }, [totalPrice,dateRange,listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            }
            else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
     },[listing.category])
  
    return (
        < Container>
            <div className="max-w-screen-lg mx-auto">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid gird-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="mb-10 order-first md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </Container>
  )
}

export default IndividualListing;
