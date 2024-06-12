import { ClientOnly,Container, EmptyState } from "./components";
import ListingCard from "./ui/listings/ListingCard";
import { getCurrentUser, getListings } from "./actions";


export default async function Home() {
  const listings =  await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (<ClientOnly>
        <EmptyState showReset/>
    </ClientOnly>)
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((list) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={list.id}
                data={list}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
