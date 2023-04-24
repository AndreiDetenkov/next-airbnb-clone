'use client'

import { SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { FC } from 'react'

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
  actionId,
  actionLabel,
  currentUser,
}) => {
  return <div>Listing Card</div>
}
