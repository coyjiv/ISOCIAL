import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Divider, Modal, Stack, Typography } from '@mui/material'
import { Paper } from '@mui/material'

import s from './RegisterConfirmModal.module.scss'
import { BlueRoundedButton } from '../../buttons'
import ConfirmModal from '../ConfirmModal'
import { useEffect } from 'react'
import { API_URL } from '../../../api'

const RegisterConfirmModal = ({ open, onClose, email }) => {
	const [isVerified, setVerified] = useState(false)
	const [preCloseModal, setPreCloseModal] = useState(false)
	const [willToClose, setWillToClose] = useState(false)

	const navigate = useNavigate()

	const onConfirm = () => navigate('/login')

	const handleClose = () => {
		if (!willToClose) {
			setPreCloseModal(true)
			return
		}
		onClose()
	}

	useEffect(() => {
		if (!open || !email || isVerified) return

		const checkConfirmation = async () => {
			const response = await fetch(
				`${API_URL}/auth/active/${email}`
			)
			if (response.status === 200) {
				setVerified(true)
			}
		}
		const interval = setInterval(() => {
			checkConfirmation()
		}
			, 10000)

		return () => clearInterval(interval)
	}, [email, isVerified, open])

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className={s.modalInner}
				disableAutoFocus
			>
				<Paper className={s.modalWrapper}>
					<Stack gap="10px" width="100%">
						<Typography variant="h4" fontSize="24px" fontWeight={900}>
							Confirmation
						</Typography>
						<Divider />
						<Typography component="p" variant="subtitle1">
							Congratulations on successfully registering your account!
							We&apos;re thrilled to have you join our community.
						</Typography>
						<Typography component="p" variant="subtitle1">A letter has been sent to your mail with a confirmation link.</Typography>
					</Stack>
					<BlueRoundedButton disabled={!isVerified} className={s.proceedButton} onClick={onConfirm}>
						Go to login
					</BlueRoundedButton>
				</Paper>
			</Modal>
			<ConfirmModal
				open={preCloseModal}
				onClose={() => setPreCloseModal(false)}
				onConfirm={() => { setWillToClose(true); setPreCloseModal(false) }}
				title="Are you sure?"
				message="If you close this window, you will not be able to check immediately the confirmation status. Do you want to close it?"
				confirmButtonText="Yes"
				cancelButtonText="No"
			/>
		</>
	)
}

RegisterConfirmModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	children: PropTypes.any,
	email: PropTypes.string,
}

RegisterConfirmModal.displayName = 'RegisterConfirmModal'

export default RegisterConfirmModal
