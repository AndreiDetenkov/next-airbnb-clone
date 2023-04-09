'use client'

import Avatar from '@/app/components/Avatar'
import { MenuItem } from '@/app/components/navbar/MenuItem'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { FC, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

export const UserMenu: FC = (): JSX.Element => {
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleOpen = (): void => {
    setIsOpen((value: boolean) => !value)
  }

  const registerModalOpen = (): void => {
    registerModal.onOpen()
    toggleOpen()
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            cursor-pointer
            rounded-full
            px-4
            py-3
            text-sm
            font-semibold
            transition
            hover:bg-neutral-100
            md:block"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="
            flex
            cursor-pointer
            flex-row
            items-center
            gap-3
            rounded-full
            border-[1px]
            border-neutral-300
            p-4
            transition
            hover:shadow-md
            md:px-2
            md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            w-[40vw]
            overflow-hidden
            rounded-xl
            border-[1px]
            bg-white
            text-sm
            shadow-md
            md:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem onClick={registerModalOpen} label="Sign up" />
              <MenuItem onClick={() => {}} label="Login" />
            </>
          </div>
        </div>
      )}
    </div>
  )
}
