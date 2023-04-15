'use client'

import Avatar from '@/app/components/Avatar'
import { MenuItem } from '@/app/components/navbar/MenuItem'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu: FC<UserMenuProps> = ({ currentUser }): JSX.Element => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleOpen = (): void => {
    setIsOpen((value: boolean) => !value)
  }

  const registerModalOpen = useCallback((): void => {
    registerModal.onOpen()
    toggleOpen()
  }, [registerModal])

  const loginModalOpen = useCallback((): void => {
    loginModal.onOpen()
    toggleOpen()
  }, [loginModal])

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
            <Avatar src={currentUser?.image} />
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
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={registerModalOpen} label="Sign up" />
                <MenuItem onClick={loginModalOpen} label="Login" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
