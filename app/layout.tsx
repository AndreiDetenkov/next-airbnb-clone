import getCurrentUser from '@/app/actions/getCurrentUser'
import { ClientOnly } from '@/app/components/ClientOnly'
import { LoginModal } from '@/app/components/modals/LoginModal'
import { RegisterModal } from '@/app/components/modals/RegisterModal'
import { RentModal } from '@/app/components/modals/RentModal'
import { ToasterProvider } from '@/app/providers/ToarserProvider'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'
import { Navbar } from './components/navbar/Navbar'
import './globals.css'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone app',
}

const font: NextFont = Nunito({
  subsets: ['latin'],
  weight: '400',
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}): Promise<JSX.Element> {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
