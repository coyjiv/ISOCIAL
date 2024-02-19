import * as Yup from 'yup'
import { PASSWORD_MIN_LENGTH } from '../Register'

export const emailScheme = Yup.object().shape({
  email: Yup.string().required('Required field').email('Incorrect email'),
})

export const restorePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required field')
    .min(PASSWORD_MIN_LENGTH, 'Must be at least 8 characters')
    .max(15, 'Must be 15 characters at most'),
  repeatPassword: Yup.string().test(
    'password',
    'Passwords do not match',
    (value, context) => value === context.parent.password
  ),
})
