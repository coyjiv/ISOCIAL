import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import uuid4 from 'uuid4'

import  NotificationToast from '../components/NotificationToast'
import { TOASTS_DURATION } from '../utils/constants'
import { ToastContainer } from '../components/NotificationToast'

export const ToastContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export let toastMessage = () => {}

const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([])

	const onRemove = (removeId) => {
		setToasts((toasts) => toasts?.filter(({ id }) => id !== removeId))
	}

	const onToast = (message, type = 'info', duration = TOASTS_DURATION) => {
		const toast = {
			id: uuid4(),
			message,
			type,
			duration,
		}

		setToasts((toasts) => [...toasts, toast])

		setTimeout(() => onRemove(toast.id), duration)
	}

	toastMessage = onToast

	const value = {
		onToast,
		onRemove,
	}

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ToastContainer>
				{toasts.map(({ id, message, type, duration }) => (
					<NotificationToast
						key={id}
						type={type}
						message={message}
						duration={duration}
						onRemove={() => onRemove(id)}
					/>
				))}
			</ToastContainer>
		</ToastContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
	return useContext(ToastContext)
}

ToastProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ToastProvider
