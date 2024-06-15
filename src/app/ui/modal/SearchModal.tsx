"use client";

import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import queryString from "query-string";

import { useSearchModal } from "@/app/hooks";
import CountrySelect, { CountrySelectValue } from "@/app/components/CountrySelect";
import { Calendar, Heading, Counter } from "@/app/components";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

enum PHASE  {
    LOCATION = 0,
    DATE = 1,
    INFO =2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [phase, setPhase] = useState(PHASE.LOCATION);
    const [location,setLocation] = useState<CountrySelectValue>()
    const [guestCount, setGuestCount] = useState<number>(1);
    const [roomCount, setRoomCount] = useState<number>(1);
    const [bathroomCount, setBathroomCount] = useState<number>(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../../components/Map'), {
        ssr:false,
    }),[location]); // eslint-disable-line

    const phaseBackward = useCallback(() => {
        setPhase((val) => val - 1)
    }, []);

    const phaseForward = useCallback(() => {
        setPhase((val) => val + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if (phase !== PHASE.INFO) {
            return phaseForward();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setPhase(PHASE.LOCATION);
        searchModal.onClose();
        router.push(url);
    },
        [
            params,
            phase,
            searchModal,
            router,
            location,
            guestCount,
            roomCount,
            bathroomCount,
            dateRange,
            phaseForward
        ]);
    
    const actionLabel = useMemo(() => {
        if (phase === PHASE.INFO) {
            return 'Search';
        }
        return 'Next';
    }, [phase]);

    const secondaryActionLabel = useMemo(() => {
        if (phase === PHASE.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [phase])
    
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect travel spots!"
            />
            <CountrySelect
                value={location}
                onChange={(loc) => setLocation(loc as CountrySelectValue)}         
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (phase === PHASE.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="When do you wanna go?"
                subtitle="Make sure everyone is available!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(date)=>setDateRange(date.selection)}
                />
            </div>
        )
    }

    if (phase === PHASE.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find the perfect place"
                />
                 <Counter
                    title="Guests"
                    subtitle="How many guest can you allow?"
                    value={guestCount}
                    onChange={(counterValue)=>setGuestCount(counterValue)}
                />
                <hr />
                   <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(counterValue)=>setRoomCount(counterValue)}
                />
                <hr />
                    <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(counterValue)=>setBathroomCount(counterValue)}
                />        
            </div>
        )
    }

    return (
        <Modal
            openModal={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Airbnb Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={phase === PHASE.LOCATION ? undefined : phaseBackward}
            body={bodyContent}
        />
  )
}

export default SearchModal
