import prisma from '@/app/libs/prismadb'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()
  const { email, password, name } = body

  const hashedPassword: string = await bcrypt.hash(password, 12)

  const user: User = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
