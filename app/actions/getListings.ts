import prisma from '@/app/libs/prismadb'
import { SafeListing } from '@/app/types'
import { Listing } from '@prisma/client'

export default async function getListings(): Promise<SafeListing[] | undefined> {
  try {
    const listings: Listing[] = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings: SafeListing[] = listings.map((listing: Listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(String(err))
    }
  }
}
