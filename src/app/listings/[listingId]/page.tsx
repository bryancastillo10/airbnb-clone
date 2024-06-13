import { getCurrentUser, getListingById } from "@/app/actions";
import { ClientOnly,EmptyState } from "@/app/components";
import IndividualListing from "./IndividualListing";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
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
          currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage;
