'use client'

import Image from 'next/image'
import { FC } from 'react'

interface avatarProps {
  src: string | undefined | null
}

const Avatar: FC<avatarProps> = ({ src }): JSX.Element => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      style={{ width: 'auto', height: 'auto' }}
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
