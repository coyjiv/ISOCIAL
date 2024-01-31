import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material'
import { useField } from 'formik'

const FormSelect = ({ id, label, name, options, size }) => {
  const [field] = useField(name)

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
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
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
