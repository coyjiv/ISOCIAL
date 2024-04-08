import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { RegistrationForm } from '../../components/form-components'
import { RegisterConfirmModal } from '../../components/modals'
import { initialValues, validationSchema } from './Register.utils'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../api'
import styles from '../Login/styles.module.scss'
import { useDocumentTitle } from 'usehooks-ts'
import { toast } from 'react-toastify'

const Register = () => {
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const { year, month, day, city, ...rest } = values

    delete rest.confirmEmail

    const data = {
      ...rest,
      dateOfBirth: `${year}-${month}-${day}`,
      city: city.charAt(0).toUpperCase() + city.slice(1)
    }

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
        setIsError(true)
      } else {
        setEmail(data.email)
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

  useEffect(() => {
    if (isError) {
      toast.error('Registration failed. Please try again later. Or with a different email', { autoClose: false, position: 'top-center' })
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }
  }, [isError])

  useDocumentTitle('Register')
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <h1 className={styles.logo}>iSocial</h1>
        <Typography className={styles.slogan}>iSpeak. iLike. iSocial.</Typography>
      </div>
      <RegistrationForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
      {/* @TODO: send toast with error message */}
      <RegisterConfirmModal
        open={openModal}
        onClose={handleModalClose}
        email={email}
      />
    </div>
  )
}

export default Register
