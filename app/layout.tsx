import { ClientOnly } from '@/app/components/ClientOnly'
import { Modal } from '@/app/components/modals/Modal'
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
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
          <Modal isOpen title="modal" actionLabel="Submit" />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
