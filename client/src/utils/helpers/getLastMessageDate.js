import moment from 'moment'

export const getLastMessageDate = (date) => {
  const now = moment()
  const messageDate = moment(date)
  const daysDiff = now.diff(messageDate, 'days')

  if (daysDiff < 1) {
    // If the message was sent less than a day ago, show hours and minutes
    return messageDate.format('HH:mm')
  } else if (daysDiff < 7) {
    // If the message was sent more than a day ago but less than a week, show the day of the week
    return messageDate.format('ddd')
  } else {
    // If the message was sent a week ago or more, show the date in DD:MM:YYYY format
    // Note: The format 'DD:MM:YYYY' might be a typo, as it's more common to use 'DD/MM/YYYY'
    // Adjust accordingly if needed
    return messageDate.format('DD.MM.YYYY')
  }
}
