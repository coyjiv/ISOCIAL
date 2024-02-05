import PropTypes from 'prop-types'
import { Typography, Divider, Stack, Box, Link } from '@mui/material'
import { Formik, Form } from 'formik'

import { RegisterFormContent } from './RegisterFormContent'
import { LINK_EXTRA_INFO } from './RegistrationForm.utils.js'
import s from './RegistrationForm.module.scss'

// TODO додати лінки до Terms, Privacy Policy and Cookies Policy.

const RegistrationForm = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Box className={s.formWrapper}>
      <Stack height="100%">
        <Stack className={s.headingWrapper}>
          <Typography variant="h4" fontSize="32px">
            Sign Up
          </Typography>
          <Typography variant="subtitle1">It’s quick and easy.</Typography>
        </Stack>
        <Divider />
        <Stack className={s.formContent} gap={1}>
          <Stack flexGrow={1}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className={s.form}>
                <RegisterFormContent />
              </Form>
            </Formik>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

RegistrationForm.displayName = 'RegistrationForm'

RegistrationForm.propTypes = {
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default RegistrationForm
