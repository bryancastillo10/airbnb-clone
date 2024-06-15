"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";
import { Heading, Container } from "../components";
import ListingCard from "../ui/listings/ListingCard";

interface ClientReservationsProps{
    reservations:SafeReservation[];
    currentUser:SafeUser | null;
}

const ClientReservations = ({reservations,currentUser}:ClientReservationsProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeleteId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation has been cancelled");
                router.refresh();
            })
            .catch(() => {
                toast.error('Error! Something went wrong.');
            })
            .finally(() => {
                setDeleteId('');
        })
    },[router])
    return (
      <Container>
          <Heading
              title="Reservations"
              subtitle="List of Bookings on your Properties"
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
                        actionLabel="Cancel Guest Reservation"
                        currentUser={currentUser}
                    />
              ))}
            </div>
    </Container>
  )
}

export default ClientReservations;
