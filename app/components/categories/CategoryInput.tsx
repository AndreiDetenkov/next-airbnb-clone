'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  label: string
  icon: IconType
  selected: boolean
  onClick: (value: string) => void
}
export const CategoryInput: FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}): JSX.Element => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-rose-500
        ${selected ? 'border-rose-500' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}
