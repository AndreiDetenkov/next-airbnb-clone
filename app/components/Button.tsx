'use client'

import { FC, MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}
export const Button: FC<ButtonProps> = ({
  label,
  outline,
  small,
  icon: Icon,
  disabled,
  onClick,
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        rounded-lg
        border-[1px]
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}
