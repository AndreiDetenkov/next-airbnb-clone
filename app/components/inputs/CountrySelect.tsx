'use client'

import { useCountries } from '@/app/hooks/useCountries'
import { FC } from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

export const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Select country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={({ flag, label, region }) => (
          <div className="flex flex-row items-center gap-3">
            <div>{flag}</div>
            <div>
              {label}
              <span className="ml-1 text-neutral-500">{region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  )
}
