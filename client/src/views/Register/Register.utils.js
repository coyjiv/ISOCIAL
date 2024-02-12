import { object, string } from 'yup'
import { getCurrentData } from '../../utils/helpers'

const { yearNow, monthNow, dayNow } = getCurrentData()

export const PASSWORD_MIN_LENGTH = 8

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
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
    .min(PASSWORD_MIN_LENGTH, 'Must be at least 8 characters')
    .max(15, 'Must be 15 characters at most'),
  repeatPassword: string().test(
    'password',
    'Passwords do not match',
    (value, context) => value === context.parent.password
  ),
})
