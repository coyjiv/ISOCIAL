import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useField } from 'formik';
import PropTypes from 'prop-types'

const FormRadioGroup = ({ role, ...props }) => {

    const [field, meta] = useField(props);

    const isError = !!meta.error && meta.touched
    return (
        <FormControl error={meta.touched && Boolean(meta.error)}>
            {role === 'gender' && (
                <>
                    <FormLabel sx={{
                        fontSize: '11px',
                        color: 'rgb(0, 0, 0)',
                    }} id="gender-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        sx={{ paddingLeft: '0.5rem' }}
                        aria-labelledby="gender-radio-buttons-group-label"
                        {...field}
                    >
                        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                    </RadioGroup>
                    {isError ? (
                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{String(meta.error)}</div>
                    ) : null}
                </>
            )}
        </FormControl>
    )
}

FormRadioGroup.propTypes = {
    role: PropTypes.string,
}

export default FormRadioGroup