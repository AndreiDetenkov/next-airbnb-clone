import { Listing, User } from '@prisma/client'
import { IconType } from 'react-icons'

export type SafeListing = Omit<Listing, 'createdAt'> & { createdAt: string }

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export interface Category {
  label: string
  icon: IconType
  description: string
}
