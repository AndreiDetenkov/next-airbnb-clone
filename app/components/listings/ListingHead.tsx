'use client'

import { Heading } from '@/app/components/Heading'
import { HeartButton } from '@/app/components/HeartButton'
import { useCountries } from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import Image from 'next/image'
import { FC } from 'react'

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image src={imageSrc} alt="Image" fill className="w-full object-cover" />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
