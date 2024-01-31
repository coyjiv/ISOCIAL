import { object, string } from 'yup'
import { getCurrentData } from '../../utils/helpers'

const { yearNow, monthNow, dayNow } = getCurrentData()

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  city: '',
  year: yearNow,
  month: monthNow,
  day: dayNow,
}

export const validationSchema = object({
  firstName: string()
    .required('Required field')
    .min(2, 'Too short')
    .max(15, 'Too long'),
  lastName: string()
    .required('Required field')
    .min(2, 'Too short')
    .max(15, 'Too long'),
  email: string().email('Invalid email').required('Required field'),
  password: string()
    .required('Required field')
    .min(8, 'Must be at least 8 characters')
    .max(15, 'Must be 15 characters at most'),
})
