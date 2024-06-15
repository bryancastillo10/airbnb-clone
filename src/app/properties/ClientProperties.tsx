"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { useCallback, useState } from "react";
import { Container, Heading } from "../components";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import ListingCard from "../ui/listings/ListingCard";

interface ClientPropertiesProps{
    listings:SafeListing[];
    currentUser?: SafeUser | null;
}


const ClientProperties = ({listings,currentUser}:ClientPropertiesProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string>('');
    const onCancel = useCallback((id: string) => {
        setDeleteId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing has been deleted');
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
              title="Your Properties"
              subtitle="The List of your Properties"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((list) => (
                    <ListingCard
                        key={list.id}
                        data={list}
                        actionId={list.id}
                        onAction={onCancel}
                        disabled={deleteId === list.id}
                        actionLabel="Delete the Property"
                        currentUser={currentUser}
                    />
              ))}
          </div>
    </Container>
  )
}

export default ClientProperties;
