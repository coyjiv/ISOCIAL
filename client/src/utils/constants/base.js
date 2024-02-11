const YEARS_COUNT = 120
const DAYS_COUNT = 31

export const YEARS = Array.from({ length: YEARS_COUNT }, (_, i) =>
  (new Date().getFullYear() - i).toString()
)

export const DAYS = [...Array(DAYS_COUNT).keys()].map((i) => {
  const day = i + 1
  return day < 10 ? `0${day}` : day.toString()
})

export const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]
