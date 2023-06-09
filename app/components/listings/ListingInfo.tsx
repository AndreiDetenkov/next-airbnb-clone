'use client'

import { FC, useMemo } from 'react'
import { IconType } from 'react-icons'

import Avatar from '@/app/components/Avatar'
import { ListingCategory } from '@/app/components/listings/ListingCategory'
import { useCountries } from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import dynamic from 'next/dynamic'

interface ListingInfoProps {
  user: SafeUser
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  locationValue: string
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
}

export const ListingInfo: FC<ListingInfoProps> = ({
  locationValue,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  user,
  category,
}) => {
  const { getByValue } = useCountries()
  const coord = getByValue(locationValue)?.latlng

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    []
  )

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coord} />
    </div>
  )
}
