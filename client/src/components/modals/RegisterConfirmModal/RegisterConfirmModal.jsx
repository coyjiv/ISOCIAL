import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Divider, Modal, Stack, Typography } from '@mui/material'
import { Paper } from '@mui/material'

import { Button } from '../../../ui'
import s from './RegisterConfirmModal.module.scss'

const RegisterConfirmModal = ({ open, onClose }) => {
  const navigate = useNavigate()

  const onConfirm = () => navigate('/login')

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={s.modalInner}
      disableAutoFocus
    >
      <Paper className={s.modalWrapper}>
        <Stack gap="10px" width="100%">
          <Typography variant="h4" fontSize="32px">
            Check your email.
          </Typography>
          <Divider />
          <Typography component="p" variant="subtitle1">
            Congratulations on successfully registering your account! Were
            thrilled to have you join our community. Youre now ready to explore
            and enjoy all the features we have to offer. If you have any
            questions or need assistance, our support team is here to help.
            Welcome aboard and lets make the most out of this journey together!
          </Typography>
        </Stack>
        <Button size="large" onClick={onConfirm}>
          Lets go to our app!
        </Button>
      </Paper>
    </Modal>
  )
}

RegisterConfirmModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
}

RegisterConfirmModal.displayName = 'RegisterConfirmModal'

export default RegisterConfirmModal
