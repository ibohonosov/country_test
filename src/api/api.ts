import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Country {
  countryCode: string
  name: string
}

export const getCountries = () => {
  return axios.get(`${BASE_URL}/AvailableCountries`)
}

export const getRandomCountryHoliday = async (): Promise<
  { name: string; holidayName: string; dateHoliday: string }[]
> => {
  const { data: allCountries } = await getCountries()
  const randomCountries: {
    name: string
    holidayName: string
    dateHoliday: string
  }[] = []
  const isUnique = new Set<number>()

  while (randomCountries.length < 3) {
    const randomIndex = Math.floor(Math.random() * allCountries.length)
    if (!isUnique.has(randomIndex)) {
      const countryCode = allCountries[randomIndex].countryCode
      const { data: nextHolidays } = await getNextHolidays(countryCode)
      const nextHoliday = nextHolidays[0]

      randomCountries.push({
        name: allCountries[randomIndex].name,
        holidayName: nextHoliday.name,
        dateHoliday: nextHoliday.date,
      })

      isUnique.add(randomIndex)
    }
  }

  return randomCountries
}

export const getCountryHolidays = (countryCode: string, year: number) => {
  return axios.get(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`)
}

export const getNextHolidays = (countryCode: string) => {
  return axios.get(`${BASE_URL}/NextPublicHolidays/${countryCode}`)
}
