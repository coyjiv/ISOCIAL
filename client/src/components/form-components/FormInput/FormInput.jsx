import PropTypes from 'prop-types'
import { Stack, TextField } from '@mui/material'
import { useField } from 'formik'
import ErrorIcon from '@mui/icons-material/Error'

import s from './FormInput.module.scss'
import { Tooltip } from '../../../ui'

const FormInput = ({
  variant,
  name,
  label,
  id,
  placeholder,
  type,
  size,
  ...props
}) => {
  const [field, meta] = useField(name)

  return (
    <Stack className={s.fieldContainer}>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        type={type}
        size={size}
        variant={variant}
        error={!!meta.error}
        {...field}
        {...props}
      />
      {meta.error && (
        <Tooltip className={s.fieldIcon} arrow title={meta.error}>
          <ErrorIcon fontSize="small" cursor="pointer" color="error" />
        </Tooltip>
      )}
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
}

FormInput.defaultProps = {
  size: 'normal',
  variant: 'outlined',
  type: 'text',
}

export default FormInput
