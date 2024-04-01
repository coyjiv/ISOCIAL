import moment from 'moment'

export const timeToBirthday = (
  dob = '1988-03-30T22:00:00.000+00:00',
  firstName
) => {
  // Parse the date of birth and set the year to the current year
  const birthdayThisYear = moment(dob).year(moment().year())
  const today = moment()

  // Check if the birthday has already happened this year
  if (birthdayThisYear.isBefore(today, 'day')) {
    // If yes, set the birthday to next year
    birthdayThisYear.add(1, 'year')
  }

  const daysUntilBirthday = birthdayThisYear.diff(today, 'days')

  if (daysUntilBirthday === 0) {
    return firstName + ' has a birthday today!'
  } else if (daysUntilBirthday === 1) {
    return firstName + ' has a birthday tomorrow!'
  } else if (daysUntilBirthday <= 7) {
    return `${firstName} has a birthday in ${daysUntilBirthday} days.`
  } else {
    // For more than a week, you can customize the message as needed
    return `${firstName} has a birthday in more than a week.`
  }
}
