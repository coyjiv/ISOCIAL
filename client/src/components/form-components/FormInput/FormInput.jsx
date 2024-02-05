import { useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, TextField } from '@mui/material'
import { useField } from 'formik'
import ErrorIcon from '@mui/icons-material/Error'

import { Tooltip, InputPasswordIcon } from '../../../ui'
import s from './FormInput.module.scss'

const FormInput = ({
  variant,
  name,
  label,
  id,
  placeholder,
  type,
  size,
  withIcon,
  ...props
}) => {
  const [inputType, setInputType] = useState(type)
  const [field, meta] = useField(name)

  const isError = !!meta.error && meta.touched

  const showPassword = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password')
  }

  return (
    <Stack className={s.fieldContainer}>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        type={inputType}
        size={size}
        variant={variant}
        error={isError}
        {...field}
        {...props}
      />
      <Stack className={s.fieldIcon}>
        <Stack className={s.iconsWrapper} width="100%" flexDirection="row">
          {withIcon && (
            <InputPasswordIcon type={inputType} onClick={showPassword} />
          )}
          {isError && (
            <Tooltip wight="fit-content" arrow title={meta.error}>
              <ErrorIcon fontSize="small" cursor="pointer" color="error" />
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

FormInput.propTypes = {
  size: PropTypes.oneOf(['small', 'normal']),
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled']),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  withIcon: PropTypes.bool,
}

FormInput.defaultProps = {
  size: 'normal',
  variant: 'outlined',
  type: 'text',
}

export default FormInput
