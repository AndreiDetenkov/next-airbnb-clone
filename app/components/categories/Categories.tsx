'use client'

import { Container } from '@/app/components/Container'
import { CategoryBox } from '@/app/components/categories/CategoryBox'
import { Category } from '@/app/types'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface CategoriesProps {
  categoriesList: Category[]
}

export const Categories: FC<CategoriesProps> = ({ categoriesList }): JSX.Element | null => {
  const params: ReadonlyURLSearchParams | null = useSearchParams()
  const category: string | null | undefined = params?.get('category')

  const pathname: string | null = usePathname()
  const isMainPage: boolean = pathname === '/'
  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
          pt-1"
      >
        {categoriesList.map(({ label, icon }) => (
          <CategoryBox key={label} label={label} icon={icon} selected={category === label} />
        ))}
      </div>
    </Container>
  )
}
