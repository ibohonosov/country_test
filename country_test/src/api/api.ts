import axios from "axios";

const BASE_URL = 'https://date.nager.at/api/v3';

export const getCountries = () => {
  return axios.get(`${BASE_URL}/AvailableCountries`);
}

export const getRandomCountyHoliday = async () => {
  const { data: allCountries } = await getCountries();
  const randomCountries = [];
  const isUnique = new Set();

  while (randomCountries.length < 3) {
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    if (!isUnique.has(randomIndex)) {
      const countryCode = allCountries[randomIndex].countryCode;
      const { data: nextHolidays} = await getNextHolidays(countryCode);
      const nextHoliday = nextHolidays[0];
      randomCountries.push({
        name: allCountries[randomIndex].name,
        holidayName: nextHoliday.name,
        dateHoliday: nextHoliday.date
      });
      isUnique.add(randomIndex);
    }
  }
  return randomCountries;
}

export const getCountryHolidays = (countryCode, year) => {
  return axios.get(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
}

export const getNextHolidays = (countryCode) => {
  return axios.get(`${BASE_URL}/NextPublicHolidays/${countryCode}`);
}


// /api/v3/NextPublicHolidays/{countryCode}
