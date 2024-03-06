import PropTypes from 'prop-types';
import { Modal, Paper, Stack, Typography, Divider } from '@mui/material';
import { GreenRoundedButton, RedRoundedButton } from '../../buttons';
import s from '../RegisterConfirmModal/RegisterConfirmModal.module.scss';

const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmButtonText, cancelButtonText }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
            className={s.modalInner}
            disableAutoFocus
        >
            <Paper className={s.modalWrapper}>
                <Stack gap="10px" width="100%">
                    <Typography variant="h4" fontSize="24px" fontWeight={900}>
                        {title}
                    </Typography>
                    <Divider />
                    <Typography component="p" variant="subtitle1">
                        {message}
                    </Typography>
                </Stack>
                <GreenRoundedButton className={s.proceedButton} onClick={onClose}>
                    {cancelButtonText}
                </GreenRoundedButton>
                <RedRoundedButton className={s.proceedButton} onClick={onConfirm}>
                    {confirmButtonText}
                </RedRoundedButton>
            </Paper>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
};

export default ConfirmModal;
