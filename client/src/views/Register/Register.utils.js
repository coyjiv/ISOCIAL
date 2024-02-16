import { object, string, number } from 'yup'
import { getCurrentData } from '../../utils/helpers'
import { isDOBValid } from '../../utils/helpers/isDOBValid'

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
    .strict(true)
    .required('Required field')
    .min(2, 'Too short')
    .max(15, 'Too long')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain numbers'),
  lastName: string()
    .strict(true)
    .required('Required field')
    .min(2, 'Too short')
    .max(15, 'Too long')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain numbers'),
  email: string().email('Invalid email').required('Required field'),
  city: string().required('Required field'),
  password: string()
    .required('Required field')
    .min(PASSWORD_MIN_LENGTH, 'Must be at least 8 characters')
    .max(15, 'Must be 15 characters at most'),
  repeatPassword: string().test(
    'password',
    'Passwords do not match',
    (value, context) => value === context.parent.password
  ),
  year: number()
    .required('Year is required')
    .test(
      'is-dob-valid',
      'You must be 18 years or older to register.',
      function (value) {
        const { month, day } = this.parent
        return isDOBValid(value, month, day)
      }
    ),
  month: number()
    .required('Month is required')
    .min(1, 'Invalid month')
    .max(12, 'Invalid month'),
  day: number()
    .required('Day is required')
    .min(1, 'Invalid day')
    .max(31, 'Invalid day'),
})
