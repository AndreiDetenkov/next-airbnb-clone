import { ClientOnly } from '@/app/components/ClientOnly'
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
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
