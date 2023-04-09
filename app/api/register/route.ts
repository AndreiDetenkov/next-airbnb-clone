import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json()
  const { email, password, name } = body

  const hashedPassword: string = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
