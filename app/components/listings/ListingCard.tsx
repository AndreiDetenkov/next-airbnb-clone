'use client'

import { Button } from '@/app/components/Button'
import { HeartButton } from '@/app/components/HeartButton'
import { useCountries } from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback, useMemo } from 'react'

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

export const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = '',
  actionLabel,
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      if (onAction) {
        onAction(actionId)
      }
    },
    [actionId, disabled, onAction]
  )

  const price = useMemo((): number => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [data.price, reservation])

  const reservationDate = useMemo((): string | null => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="image"
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-medium">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">&nbsp;night</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )}
      </div>
    </div>
  )
}
