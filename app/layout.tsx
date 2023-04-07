import { ClientOnly } from '@/app/components/ClientOnly'
import { RegisterModal } from '@/app/components/modals/RegisterModal'
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar />
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
