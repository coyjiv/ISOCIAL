import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import { RegistrationForm } from '../../components/form-components'
import { RegisterConfirmModal } from '../../components/modals'
import { initialValues, validationSchema } from './Register.utils'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../api'
import s from './Register.module.scss'

const Register = () => {
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const { year, month, day, ...rest } = values

    delete rest.confirmEmail
    delete rest.confirmPassword

    const data = {
      ...rest,
      repeatPassword: rest.confirmPassword,
      dateOfBirth: `${year}-${month}-${day}`,
    }
    delete data.confirmPassword

    console.log(data)

    //TODO change after added RTK Query
    try {
      const response = await fetch(
        `${API_URL}/auth/registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      if (response.status != 201 && !response.ok) {
        // setIsError(true)
        console.log('Error');
      } else {
        setOpenModal(true)
      }
    } catch (error) {
      console.error('Registration error:', error.message)
    }
  }

  const handleModalClose = () => {
    setOpenModal(false)
    navigate('/login')
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
        onClose={handleModalClose}
      />
    </Box>
  )
}

export default Register
