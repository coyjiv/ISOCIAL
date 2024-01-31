import Box from '@mui/material/Box'

import { RegistrationForm } from '../../components/form-components'
import { initialValues, validationSchema } from './Register.utils'

import s from './Register.module.scss'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";
// import { REGISTER_ENDPOINT } from '../../api/config'
// import { API_URL } from "../../api/config";

// Async thunk to handle the registration API call

const Register = () => {
	const [
		isError, setIsError
	] = useState(false)

	const navigate = useNavigate()
  const handleSubmit = async (values) => {
    const { year, month, day, ...rest } = values;

    const data = {
      ...rest,
      dOb: `${year}-${month}-${day}`,
    };

    console.log(data);

    try {
      // Dispatch the registration action
			const response = await fetch('http://localhost:9000/api/auth/registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.status != 204) {
				setIsError(true)
			} else {
				navigate('/login')
			}
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  }

	return (
		<Box className={s.pageWrapper}>
			<RegistrationForm
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			/>
			{
				isError && <div>Error</div>
			}
		</Box>
	)
}

export default Register
