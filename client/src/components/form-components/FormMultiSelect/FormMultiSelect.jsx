import PropTypes from 'prop-types'
import { Stack } from '@mui/material'

import FormSelect from '../FormSelect'
import { MultiSelectLabel } from './MultiSelectLabel'

const FormMultiSelect = ({
  fields,
  size,
  direction,
  gap,
  label,
  labelTrigger,
  labelDescription,
}) => {
  return (
    <Stack flexDirection={direction} gap={gap} position="relative" mt="18px">
      <MultiSelectLabel
        label={label}
        trigger={labelTrigger}
        description={labelDescription}
      />
      {fields?.map((field) => (
        <FormSelect
          key={field.name}
          id={field.id}
          name={field.name}
          placeholder={field.placeholder}
          label={field.label}
          options={field.options}
          size={size}
        />
      ))}
    </Stack>
  )
}

FormMultiSelect.propTypes = {
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  labelTrigger: PropTypes.oneOf(['hover', 'click']),
  gap: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'column']),
  fields: PropTypes.array,
  size: PropTypes.oneOf(['small', 'medium']),
}

FormMultiSelect.defaultProps = {
  gap: 2,
  direction: 'row',
  size: 'medium',
}

export default FormMultiSelect
