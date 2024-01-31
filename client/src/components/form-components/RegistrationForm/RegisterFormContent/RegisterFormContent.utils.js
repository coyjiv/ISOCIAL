import {
  CITIES,
  YEARS,
  MONTHS,
  DAYS,
} from '../../../../utils/constants/index.js'

export const registerSelectOptions = CITIES.map((city) => {
  return {
    value: city.toLowerCase(),
    label: city,
  }
})

const yearOptions = YEARS.map((year) => {
  return {
    value: year.toLowerCase(),
    label: year,
  }
})

const monthOptions = MONTHS.map((city) => {
  return {
    value: city.toLowerCase(),
    label: city,
  }
})

const daysOptions = DAYS.map((day) => {
  return {
    value: day.toLowerCase(),
    label: day,
  }
})

export const multiSelectFields = [
  {
    id: 'year',
    name: 'year',
    options: yearOptions,
  },
  {
    id: 'month',
    name: 'month',
    options: monthOptions,
  },
  {
    id: 'day',
    name: 'day',
    options: daysOptions,
  },
]
