'use client'

import { BiSearch } from 'react-icons/bi'

export const Search = (): JSX.Element => {
  return (
    <div className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <div className="flex flex-row items-center justify-center">
        <div className="forn-semibold px-6 text-sm">Anywhere</div>

        <div className="forn-semibold hidden flex-1 border-x-[1px] px-6 text-center text-sm sm:block">
          AnyWeek
        </div>

        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">Add Guests</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  )
}
