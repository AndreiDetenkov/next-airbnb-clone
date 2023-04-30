'use client'

import { Container } from '@/app/components/Container'
import { categoriesList } from '@/app/components/categories/categoriesList'
import { ListingHead } from '@/app/components/listings/ListingHead'
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { FC, useMemo } from 'react'

interface ListingClientProps {
  reservations?: Reservation
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
        </div>
      </div>
    </Container>
  )
}
