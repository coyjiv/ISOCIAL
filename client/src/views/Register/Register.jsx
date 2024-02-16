import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { RegistrationForm } from '../../components/form-components'
import { RegisterConfirmModal } from '../../components/modals'
import { initialValues, validationSchema } from './Register.utils'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../api'
import { useToast } from '../../context'
import styles from '../Login/styles.module.scss'

const Register = () => {
	const [openModal, setOpenModal] = useState(false)
	const [email, setEmail] = useState('')
	const { onToast } = useToast()

	const navigate = useNavigate()

	const handleSubmit = async (values) => {
		const { year, month, day, ...rest } = values

		delete rest.confirmEmail

		const data = {
			...rest,
			dateOfBirth: `${year}-${month}-${day}`,
		}

		console.log(data)

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
				onToast("Something went wrong", 'error')
			} else {
				setEmail(data.email)
				setOpenModal(true)
			}
		} catch (error) {
			onToast(error.message, 'info')
		}
	}

	const handleModalClose = () => {
		setOpenModal(false)
		navigate('/login')
	}

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
			<RegisterConfirmModal
				open={openModal}
				onClose={handleModalClose}
				email={email}
			/>
		</div>
	)
}

export default Register
