import prisma from '@/app/libs/prismadb'
import { Listing } from '@prisma/client'

export default async function getListings(): Promise<Listing[] | undefined> {
  try {
    return await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(String(err))
    }
  }
}
