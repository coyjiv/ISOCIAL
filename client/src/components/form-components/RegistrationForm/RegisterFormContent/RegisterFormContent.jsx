import { Stack } from '@mui/material'

import { FormInput, FormMultiSelect, FormSelect } from '../../index'
import { Button } from '../../../../ui'
import {
  multiSelectFields,
  registerSelectOptions,
} from './RegisterFormContent.utils'

const RegisterFormContent = () => {
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
        <FormInput
          name="password"
          id="password"
          placeholder="Password"
          size="small"
          type="password"
          fullWidth
        />
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
