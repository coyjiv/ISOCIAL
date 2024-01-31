export const getCurrentData = () => {
  const date = new Date()

  let monthNow = date.getMonth() + 1
  monthNow = monthNow < 10 ? '0' + monthNow : monthNow

  return {
    yearNow: date.getFullYear(),
    monthNow,
    dayNow: date.getDate(),
  }
}
