import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material'
import { useField } from 'formik'
import Tooltip from '../../Tooltip/Tooltip'
import ErrorIcon from '@mui/icons-material/Error'

const FormSelect = ({ id, label, name, options, size }) => {
  const [field, meta] = useField(name)

  const isError = !!meta.error && meta.touched

  const value = field.value === '' ? options[0].value : field.value

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        labelId={id}
        id={id}
        label={label}
        size={size}
        {...field}
        value={value}
        error={isError}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      <div style={{ position: 'absolute', right: '30px', top: '10px' }}>
        {isError && (
          <Tooltip width="20px" arrow title={meta.error}>
            <ErrorIcon fontSize="small" cursor="pointer" color="error" />
          </Tooltip>
        )}
      </div>
    </FormControl>
  )
}

FormSelect.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
}

FormSelect.defaultProps = {
  size: 'medium',
}

export default FormSelect
