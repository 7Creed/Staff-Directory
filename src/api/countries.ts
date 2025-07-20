import axios from 'axios'

// interface Country {
//   name: string;
//   country: string;
//   // Add more fields if needed
// }

export const fetchData = async () => {
  const cached = localStorage.getItem('countryData')
  if (cached) {
    return JSON.parse(cached)
  }

  try {
    const response = await axios.get(
      `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`,
    )

    const fullData = response.data

    const countryStateMap = fullData.reduce(
      (acc: Record<string, string[]>, cur: any) => {
        const { country, subcountry } = cur

        if (!acc[country]) {
          acc[country] = []
        }

        if (!acc[country].includes(subcountry)) {
          acc[country].push(subcountry)
        }

        return acc
      },
      {},
    )

    localStorage.setItem('countryData', JSON.stringify(countryStateMap))
    console.log(countryStateMap)

    return countryStateMap
  } catch (error) {
    console.error('Error loading country data:', error)
    throw error
  }
}
