import getCurrentUser from '@/app/actions/getCurrentUser'
import getListings from '@/app/actions/getListings'
import { ClientOnly } from '@/app/components/ClientOnly'
import { Container } from '@/app/components/Container'
import { EmptyState } from '@/app/components/EmptyState'
import { ListingCard } from '@/app/components/listings/ListingCard'
import { SafeListing } from '@/app/types'

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if (!listings) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings &&
            listings.map((listing: SafeListing) => {
              return <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
            })}
        </div>
      </Container>
    </ClientOnly>
  )
}
