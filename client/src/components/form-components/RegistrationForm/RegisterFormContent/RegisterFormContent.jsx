import { Stack } from '@mui/material'
import { useFormikContext } from 'formik'

import { FormInput, FormMultiSelect, FormSelect } from '../../index'
import Button from '../../../buttons/Button'
import { PASSWORD_MIN_LENGTH } from '../../../../views/Register'
import {
  multiSelectFields,
  registerSelectOptions,
} from './RegisterFormContent.utils'

const RegisterFormContent = () => {
  const { values, isValid } = useFormikContext()
  const showConfirmPassword = values.password.length > PASSWORD_MIN_LENGTH - 1

  console.log(multiSelectFields);

  return (
    <>
      <Stack width="100%" flexDirection="row" justifyContent="center" gap={2}>
        <FormInput
          name="firstName"
          id="firstName"
          placeholder="First Name"
          size="small"
          fullWidth
          autoComplete="given-name"
        />
        <FormInput
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          size="small"
          autoComplete="family-name"
          fullWidth
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
            name="confirmPassword"
            id="confirmPassword"
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
      </Stack>
      <Button disabled={!isValid} type="submit" size="large" mt={1} fullWidth>
        Register
      </Button>
    </>
  )
}

export default RegisterFormContent
