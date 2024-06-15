import { EmptyState, ClientOnly } from "../components";
import { getCurrentUser, getReservations } from "../actions";
import ClientTrips from "./ClientTrips";

const TripPage = async () => {
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
        userId: currentUser.id
    });
    
    if (reservations.length === 0) {
            return (
                <ClientOnly>
                    <EmptyState
                        title="No trips were found"
                        subtitle="Looks like you haven&apos;t reserved any trips "
                    />
                </ClientOnly>
            )
    }
    return (
        <ClientOnly>
            <ClientTrips
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripPage;
