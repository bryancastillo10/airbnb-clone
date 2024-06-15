"use client";
import { SafeListing, SafeUser } from "../types";
import { Container, Heading } from "../components";
import ListingCard from "../ui/listings/ListingCard";

interface ClientFavoritesProps{
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const ClientFavorites = ({listings, currentUser}:ClientFavoritesProps) => {
  return (
      <Container>
          <Heading
              title="Favorites"
              subtitle="List of places you have favorited"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {listings.map((list) => (
                  <ListingCard
                      key={list.id}
                      currentUser={currentUser}
                      data={list}
                  />
              ))}
          </div>
    </Container>
  )
}

export default ClientFavorites;
