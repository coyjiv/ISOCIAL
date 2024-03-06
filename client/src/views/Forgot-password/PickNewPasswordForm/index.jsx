import GenericModalForm from "../../../components/modals/GenericModalForm"
import { restorePasswordSchema } from "../validation"
import { FormInput } from "../../../components/form-components"
import PropTypes from 'prop-types'
import spinnerSrc from '../../../assets/icons/spinner.svg'
import styles from '../Forgot-password.module.scss'

export const PickNewPasswordForm = ({ handleSubmit, isError }) => (
    <>
        <GenericModalForm
            title="Pick a new password"
            initialValues={{ password: "", repeatPassword: "" }}
            validationSchema={restorePasswordSchema}
            handleSubmit={handleSubmit}
            submitButtonText="Update"
            spinnerSrc={spinnerSrc}
        >
            <p className={styles.modalP}>
                Please enter your new password.
            </p>
            <input hidden type="text" autoComplete="username"></input>
            <div className={styles.updatePasswordInputWrapper}>
                <FormInput
                    name="password"
                    id="password"
                    placeholder="Password"
                    size="small"
                    autoComplete="new-password"
                    type="password"
                    fullWidth
                    withIcon
                />
                <FormInput
                    name="repeatPassword"
                    id="repeatPassword"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    size="small"
                    type="password"
                    fullWidth
                    withIcon
                />
            </div>
        </GenericModalForm>
        {isError && <p className={styles.error}>Cannot find your account</p>}
    </>
)

PickNewPasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired
}