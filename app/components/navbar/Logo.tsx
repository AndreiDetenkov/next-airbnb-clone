'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const Logo: FC = (): JSX.Element => {
  const router: AppRouterInstance = useRouter()

  return (
    <Image
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height={100}
      width={100}
      style={{ width: 'auto', height: 'auto' }}
      src="/images/logo.png"
      onClick={() => router.push('/')}
    />
  )
}
