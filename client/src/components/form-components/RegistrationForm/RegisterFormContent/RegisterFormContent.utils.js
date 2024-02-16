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
    autoComplete: 'bday-year',
  },
  {
    id: 'month',
    name: 'month',
    options: monthOptions,
    autoComplete: 'bday-month',
  },
  {
    id: 'day',
    name: 'day',
    options: daysOptions,
    autoComplete: 'bday-day',
  },
]

export const isValidEmailFormat = (str) => {
  const pattern = /@[a-zA-Z]+\.+[a-zA-Z]+/
  return pattern.test(str)
}
