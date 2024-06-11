"use client";
import { useMemo, useState } from "react";
import Modal from "./Modal";
import { useRentModal } from "@/app/hooks";
import { Heading, CategoryInput, CountrySelect } from "@/app/components";
import { categories } from "@/app/constants";
import { FieldValues, useForm } from "react-hook-form";

import dynamic from "next/dynamic";

enum PHASE {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [phase, setPhase] = useState(PHASE.CATEGORY);

    const { register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: ""
        }
    });
    // Watch For Changes in Value
    const category = watch('category');
    const location = watch('location');

    
    const Map = useMemo(() => dynamic(() => import("../../components/Map"), {
        ssr: false
    }), [location]);  // eslint-disable-line

    const setCustomValue = (id: string, value: any)=>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch:true
        })
    }

    const phaseBackward = () => {
        setPhase((val) => val - 1);
    }

    const phaseForward = () => {
        setPhase((val) => val + 1);
    }

    const actionLabel = useMemo(() => {
        if (phase === PHASE.PRICE) {
            return 'Create';
        }

        return 'Next';
    }, [phase]);

    const secondaryActionLabel = useMemo(() => {
        if (phase === PHASE.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [phase])
    

    // Body Content Per Phase
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Can you describe your place?"
                     subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((cat) => (
                    <div key={cat.id} className="col-span-1">
                        <CategoryInput
                            onClick={(selectedCategory)=>setCustomValue('category',selectedCategory)}
                            selected={category === cat.label}
                            label={cat.label}
                            icon={cat.icon} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (phase === PHASE.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading title="Where is your place located?"
                        subtitle="Helping your guests to find you"
                />
                <CountrySelect
                    value={location}
                    onChange={(selectedCountry) => setCustomValue('location', selectedCountry)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }


    return (
        <Modal
            openModal={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={phaseForward}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={phase === PHASE.CATEGORY ? undefined : phaseBackward}
            title="Airbnb your home!"
            body={bodyContent}
        />
  )
}

export default RentModal;
