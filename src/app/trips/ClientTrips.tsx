"use client";

import { useCallback, useState } from "react";
import { Container, Heading } from "../components";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../ui/listings/ListingCard";

interface ClientTripsProps{
    reservations:SafeReservation[];
    currentUser: SafeUser | null;
}


const ClientTrips = ({reservations,currentUser}:ClientTripsProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string>('');
    const onCancel = useCallback((id: string) => {
        setDeleteId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation has been cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeleteId('');
            });
    }, [router]);
    return (
    <Container>
          <Heading
              title="Trips"
              subtitle="Where you&apos;ve been and where you&apos;re going"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reserve) => (
                    <ListingCard
                        key={reserve.id}
                        data={reserve.listing}
                        reservation={reserve}
                        actionId={reserve.id}
                        onAction={onCancel}
                        disabled={deleteId === reserve.id}
                        actionLabel="Cancel Reservation"
                        currentUser={currentUser}
                    />
              ))}
          </div>
    </Container>
  )
}

export default ClientTrips;
