"use client";
import { useMemo, useState } from "react";
import Modal from "./Modal";
import { useRentModal } from "@/app/hooks";
import {
    Heading,
    Input,
    CategoryInput,
    CountrySelect,
    Counter,
    ImageUpload,
} from "@/app/components";
import { categories } from "@/app/constants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [phase, setPhase] = useState(PHASE.CATEGORY);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (phase !== PHASE.PRICE) {
            return phaseForward();
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing has been Created');
                router.refresh();
                reset();
                setPhase(PHASE.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Error error! Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
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

    if (phase === PHASE.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading
                    title="Share some information about your place"
                    subtitle="What are the accomodations do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guest can you allow?"
                    value={guestCount}
                    onChange={(counterValue)=>setCustomValue('guestCount',counterValue)}
                />
                <hr />
                   <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(counterValue)=>setCustomValue('roomCount',counterValue)}
                />
                <hr />
                    <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(counterValue)=>setCustomValue('bathroomCount',counterValue)}
                />               
            </div>
        )
    }
    if (phase === PHASE.IMAGES) {
        bodyContent = (<div className="flex flex-col gap-8">
            <Heading
                title="Please add a photo of your place"
                subtitle="Show your guests what your place looks like"
            />
            <ImageUpload
                imgValue={imageSrc}
                onChange={(imageValue)=>setCustomValue('imageSrc',imageValue)}
            />
        </div>)
    }

    if (phase === PHASE.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="This helps you attract potential clients"
                />

                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (phase === PHASE.PRICE) {
        bodyContent = (
            <div>
                <Heading
                    title="Time to set your price"
                    subtitle="How much would you like to charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            openModal={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={phase === PHASE.CATEGORY ? undefined : phaseBackward}
            title="Airbnb your home!"
            body={bodyContent}
        />
  )
}

export default RentModal;
