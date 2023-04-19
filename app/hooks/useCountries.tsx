import type { CountrySelectValue } from '@/app/components/inputs/CountrySelect'
import countries from 'world-countries'

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

export const useCountries = () => {
  const getAll = (): CountrySelectValue[] => formattedCountries

  const getByValue = (value: string): CountrySelectValue | void => {
    const result: CountrySelectValue | undefined = formattedCountries.find(
      (item): boolean => item.value === value
    )
    return result && result
  }

  return {
    getAll,
    getByValue,
  }
}
