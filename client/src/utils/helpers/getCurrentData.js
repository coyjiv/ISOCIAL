export const getCurrentData = () => {
  const date = new Date()

  let monthNow = date.getMonth() + 1
  monthNow = monthNow < 10 ? '0' + monthNow : monthNow

  const dayNow = date.getDate()

  return {
    yearNow: date.getFullYear(),
    monthNow,
    dayNow: dayNow < 10 ? '0' + dayNow : dayNow,
  }
}
