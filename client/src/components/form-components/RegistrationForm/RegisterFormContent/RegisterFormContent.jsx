import { Stack } from '@mui/material'
import { useFormikContext } from 'formik'

import { FormInput, FormMultiSelect, FormSelect } from '../../index'
import FormRadioGroup from '../../FormRadioGroup/FormRadioGroup'
import { BlueRoundedButton } from '../../../buttons'
import { PASSWORD_MIN_LENGTH } from '../../../../views/Register'
import {
  multiSelectFields,
  registerSelectOptions,
} from './RegisterFormContent.utils'

import s from '../RegistrationForm.module.scss'
import styles from '../../../../views/Login/styles.module.scss'

import spinner from '../../../../assets/icons/spinner.svg'
import { Link } from 'react-router-dom'

const RegisterFormContent = () => {
  const { values, isValid, isSubmitting, isFailed } = useFormikContext()
  const showConfirmPassword = values.password.length > PASSWORD_MIN_LENGTH - 1

  return (
    <>
      <Stack width="100%" flexDirection="row" justifyContent="center" gap={2}>
        <input hidden type="text" autoComplete="username"></input>
        <FormInput
          name="firstName"
          id="firstName"
          placeholder="First Name"
          size="small"
          fullWidth
          autoComplete="given-name"
          type='text' />
        <FormInput
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          size="small"
          autoComplete="family-name"
          fullWidth
          type='text'
        />
      </Stack>
      <Stack width="100%" gap={2}>
        <FormInput
          name="email"
          id="email"
          placeholder="Email"
          size="small"
          autoComplete="email"
          fullWidth
          type='email'
        />
        <FormInput
          name="password"
          id="password"
          placeholder="Password"
          size="small"
          autoComplete="new-password"
          type="password"
          fullWidth
          withIcon
        />

        {showConfirmPassword && (
          <FormInput
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            size="small"
            type="password"
            fullWidth
            withIcon
          />
        )}
        <FormSelect
          id="city"
          name="city"
          placeholder="City"
          size="small"
          options={registerSelectOptions}
        />
        <FormMultiSelect
          fields={multiSelectFields}
          label="Birthday"
          size="small"
          labelTrigger="click"
          labelDescription="Choose your birthday"
        />
        <FormRadioGroup name="gender" role="gender" />
      </Stack>
      {isSubmitting ?
        <img src={spinner} alt="spinner" className={styles.spinner} />
        :
        <BlueRoundedButton className={s.submitButton} disabled={!isValid} type="submit" size="large" mt={1}>
          Register
        </BlueRoundedButton>
      }
      {isFailed && <p className={styles.wrongPass}>Probably there is an account, associated with this email</p>}
      <Link to="/login" className={s.link}>Already have an account? Sign in</Link>
    </>
  )
}

export default RegisterFormContent
