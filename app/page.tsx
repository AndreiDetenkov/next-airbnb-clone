import getCurrentUser from '@/app/actions/getCurrentUser'
import getListings from '@/app/actions/getListings'
import { ClientOnly } from '@/app/components/ClientOnly'
import { Container } from '@/app/components/Container'
import { EmptyState } from '@/app/components/EmptyState'
import { ListingCard } from '@/app/components/listings/ListingCard'
import { SafeUser } from '@/app/types'
import { Listing } from '@prisma/client'

export default async function Home(): Promise<JSX.Element> {
  const listings: Listing[] | undefined = await getListings()
  const currentUser: SafeUser | null = await getCurrentUser()

  if (listings?.length === 0) {
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
          {listings?.map((listing: Listing) => {
            return <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
