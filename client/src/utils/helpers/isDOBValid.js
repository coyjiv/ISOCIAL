export const isDOBValid = (year, month, day) => {
  // if users are under 18, they can't register

  // if they're older than 120 years, they are probably dead
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()
  if (currentYear - year < 18 || currentYear - year > 120) {
    return false
  }
  if (currentYear - year === 18) {
    if (currentMonth < month) {
      return false
    }
    if (currentMonth === month) {
      if (currentDay < day) {
        return false
      }
    }
  } else {
    return true
  }
}
