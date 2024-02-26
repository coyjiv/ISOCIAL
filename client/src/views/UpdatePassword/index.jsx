import { useState } from "react";
import { PickNewPasswordForm } from "../Forgot-password/PickNewPasswordForm";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";
import { UnAuthorizedNavbar } from "../../components/layout/Navbar/UnAuthorizedNavbar";
import { updatePassword } from "../../lib/auth/forgotPassword";
import { GreenRoundedButton } from "../../components/buttons";
import { Modal, Paper, Stack, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from './updatePassword.module.scss'
import s from '../../components/modals/RegisterConfirmModal/RegisterConfirmModal.module.scss'

const UpdatePassword = () => {
    const [postChangeModal, setPostChangeModal] = useState(false)
    const [isError, setIsError] = useState(false)
    const { id } = useParams();

    const handleUpdatePassword = async (values) => {
        if (isError) setIsError(false);
        updatePassword(values, id, () => setIsError(true), () => setPostChangeModal(true))
    }

    const navigation = useNavigate();
    const navigateToLogin = () => {
        setPostChangeModal(false);
        navigation("/login");
    }

    useDocumentTitle("Update password");

    return (
        <div>
            <UnAuthorizedNavbar />
            <main className={styles.main}>
                <PickNewPasswordForm isError={isError} handleSubmit={handleUpdatePassword} />
            </main>
            <Modal
                open={postChangeModal}
                onClose={() => setPostChangeModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={s.modalInner}
                disableAutoFocus
            >
                <Paper className={s.modalWrapper}>
                    <Stack gap="10px" width="100%">
                        <Typography variant="h4" fontSize="24px" fontWeight={900}>
                            Success
                        </Typography>
                        <Divider />
                        <Typography component="p" variant="subtitle1">
                            Your password has been successfully updated
                        </Typography>
                    </Stack>
                    <GreenRoundedButton className={s.greenSuccess} onClick={navigateToLogin}>Go to login</GreenRoundedButton>
                </Paper>
            </Modal>
        </div>
    )
}

export default UpdatePassword;