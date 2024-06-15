import { EmptyState, ClientOnly } from "../components";

import { getCurrentUser, getReservations } from "../actions";
import ClientReservations from "./ClientReservations";


const ReservationsPage = async() => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
      return (
    <ClientOnly>
         <EmptyState
                  title="Unauthorized Access"
                  subtitle="Please login to view this page"
                />
    </ClientOnly>
  )
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

    if (reservations.length === 0) {
            return (
                <ClientOnly>
                    <EmptyState
                        title="No reservations were found"
                        subtitle="Looks like you don&apos;t have any reservations from your properties "
                    />
                </ClientOnly>
            )
    }
  return (
    <ClientOnly>
      <ClientReservations
        reservations={reservations} 
        currentUser={currentUser}
      />
    </ClientOnly>
  )

}

export default ReservationsPage;
