'use client'

import { useFavorite } from '@/app/hooks/useFavorite'
import { SafeUser } from '@/app/types'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

export const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorite, toggleFavorite } = useFavorite({ listingId, currentUser })

  return (
    <div onClick={toggleFavorite} className="relative cursor-pointer transition hover:opacity-80">
      <AiOutlineHeart size={28} className="absolute -right-[2px] -top-[2px] fill-white" />
      <AiFillHeart size={24} className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  )
}
