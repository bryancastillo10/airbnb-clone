import { ClientOnly, EmptyState } from "../components";
import ClientFavorites from "./ClientFavorites";
import { getCurrentUser, getFavoriteListings } from "../actions";

const FavoritesPage = async () => {
    const favelistings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
  
    if(favelistings.length === 0){
    return (
        <ClientOnly>
            <EmptyState
                title="No Favorites found"
                subtitle="Looks like you don&apos;t have any favorite listings"
            />
        </ClientOnly>
    )}

    return (
        <ClientOnly>
            <ClientFavorites
                listings={favelistings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
  
}

export default FavoritesPage;
