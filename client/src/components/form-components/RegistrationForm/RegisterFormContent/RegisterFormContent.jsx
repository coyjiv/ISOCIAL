import { Stack } from '@mui/material'
import { useFormikContext } from 'formik'

import { FormInput, FormMultiSelect, FormSelect } from '../../index'
import { Button } from '../../../../ui'
import { PASSWORD_MIN_LENGTH } from '../../../../views/Register'
import {
  multiSelectFields,
  registerSelectOptions,
  isValidEmailFormat,
} from './RegisterFormContent.utils'

const RegisterFormContent = () => {
  const { values } = useFormikContext()
  const showConfirmEmail = isValidEmailFormat(values.email)
  const showConfirmPassword = values.password.length > PASSWORD_MIN_LENGTH - 1

  return (
    <>
      <Stack width="100%" flexDirection="row" justifyContent="center" gap={2}>
        <FormInput
          name="firstName"
          id="firstName"
          placeholder="First Name"
          size="small"
          fullWidth
        />
        <FormInput
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          size="small"
          fullWidth
        />
      </Stack>
      <Stack width="100%" gap={2}>
        <FormInput
          name="email"
          id="email"
          placeholder="Email"
          size="small"
          fullWidth
        />
        {showConfirmEmail && (
          <FormInput
            name="confirmEmail"
            id="confirmEmail"
            placeholder="Confirm Email"
            size="small"
            fullWidth
          />
        )}
        <FormInput
          name="password"
          id="password"
          placeholder="Password"
          size="small"
          type="password"
          fullWidth
          withIcon
        />

        {showConfirmPassword && (
          <FormInput
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
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
      </Stack>
      <Button type="submit" size="large" color="#00a400" mt={1} fullWidth>
        Contained
      </Button>
    </>
  )
}

export default RegisterFormContent
