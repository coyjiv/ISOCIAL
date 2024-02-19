import styles from "./Forgot-password.module.scss";
import { useState } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { SendRestoreLinkForm } from "./SendRestoreLinkForm";
import { sendResetPasswordRequest } from "../../lib/auth/forgotPassword";
import { Modal, Paper, Stack, Typography, Divider } from "@mui/material";
import { GreenRoundedButton } from "../../components/buttons";
import { useNavigate } from "react-router";
import { UnAuthorizedNavbar } from "../../components/layout/Navbar/UnAuthorizedNavbar";
import s from '../../components/modals/RegisterConfirmModal/RegisterConfirmModal.module.scss'


const ForgotPassword = () => {
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleSendResetPasswordRequest = async (values) => {
    if (isError) setIsError(false)
    sendResetPasswordRequest(values, () => setIsError(true), () => setOpenModal(true))
  }

  const navigate = useNavigate()
  const navigateToLogin = () => {
    setOpenModal(false)
    navigate("/login")
  }



  useDocumentTitle("Forgot password");
  return (
    <div>
      <UnAuthorizedNavbar />
      <main className={styles.main}>
        <SendRestoreLinkForm isError={isError} handleSubmit={handleSendResetPasswordRequest} />
      </main>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={s.modalInner}
        disableAutoFocus
      >
        <Paper className={s.modalWrapper}>
          <Stack gap="10px" width="100%" >
            <Typography variant="h4" fontSize="24px" fontWeight={900}>
              Password reset link sent
            </Typography>
            <Divider />
            <Typography component="p" variant="subtitle1">
              You will receive an email with a link to reset your password shortly.
            </Typography>
          </Stack>
          <GreenRoundedButton className={s.greenSuccess} onClick={navigateToLogin}>Go to login</GreenRoundedButton>
        </Paper>
      </Modal>
    </div>
  );
};

export default ForgotPassword;