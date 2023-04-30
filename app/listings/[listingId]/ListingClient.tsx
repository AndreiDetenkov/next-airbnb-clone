'use client'

import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { FC, useMemo } from 'react'

import { Container } from '@/app/components/Container'
import { categoriesList } from '@/app/components/categories/categoriesList'
import { ListingHead } from '@/app/components/listings/ListingHead'
import { ListingInfo } from '@/app/components/listings/ListingInfo'

interface ListingClientProps {
  reservations?: Reservation[]
  listing: SafeListing & { user: SafeUser }
  currentUser?: SafeUser | null
}

export const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  const category = useMemo(() => {
    return categoriesList.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              locationValue={listing.locationValue}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              category={category}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
