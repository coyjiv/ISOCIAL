import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'

import { RegistrationForm } from '../../components/form-components'
import { RegisterConfirmModal } from '../../components/modals'
import { initialValues, validationSchema } from './Register.utils'
import s from './Register.module.scss'

const Register = () => {
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const { year, month, day, ...rest } = values

    delete rest.confirmEmail

    const data = {
			...rest,
      dateOfBirth: `${year}-${month}-${day}`,
    }

    console.log(data)

    if (data) {
      setOpenModal(true)
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}auth/registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      if (response.status != 201) {
        setIsError(true)
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.error('Registration error:', error.message)
    }
  }

  return (
    <Box className={s.pageWrapper}>
      <RegistrationForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
      {isError && <div>Error</div>}
      <RegisterConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  )
}

export default Register
