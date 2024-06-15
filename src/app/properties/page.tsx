import { EmptyState, ClientOnly } from "../components";
import { getCurrentUser, getListings} from "../actions";
import ClientProperties from "./ClientProperties";

const PropertiesPage = async () => {
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

        const listings = await getListings({
        userId: currentUser.id
    });
    
    if (listings.length === 0) {
            return (
                <ClientOnly>
                    <EmptyState
                        title="No properties were found"
                        subtitle="Looks like you have no properties"
                    />
                </ClientOnly>
            )
    }
    return (
        <ClientOnly>
            <ClientProperties
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;
