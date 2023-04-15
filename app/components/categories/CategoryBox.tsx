'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { FC, useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  label: string
  icon: IconType
  selected?: boolean
}

export const CategoryBox: FC<CategoryBoxProps> = ({ label, icon: Icon, selected }): JSX.Element => {
  const router: AppRouterInstance = useRouter()
  const params: ReadonlyURLSearchParams | null = useSearchParams()

  const handleClick = useCallback((): void => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url: string = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        cursor-pointer
        flex-col 
        items-center 
        justify-center 
        gap-2 
        border-b-2
        p-3 
        transition 
        hover:text-neutral-800
        ${selected ? 'border-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}
