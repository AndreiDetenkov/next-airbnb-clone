'use client'

import { Container } from '@/app/components/Container'
import { Categories } from '@/app/components/categories/Categories'
import { categoriesList } from '@/app/components/categories/categoriesList'
import { Logo } from '@/app/components/navbar/Logo'
import { Search } from '@/app/components/navbar/Search'
import { UserMenu } from '@/app/components/navbar/UserMenu'
import { SafeUser } from '@/app/types'
import { FC } from 'react'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar: FC<NavbarProps> = ({ currentUser }): JSX.Element => {
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories categoriesList={categoriesList} />
    </div>
  )
}
