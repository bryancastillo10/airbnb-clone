import { getCurrentUser, getListingById, getReservations } from "@/app/actions";
import { ClientOnly,EmptyState } from "@/app/components";
import IndividualListing from "./IndividualListing";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  const listing = await getListingById(params);
  
  if (!listing) {
    return (
      <ClientOnly>
          <EmptyState/>
        </ClientOnly>
      )
    }

    return (
    <ClientOnly>
        <IndividualListing
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage;
