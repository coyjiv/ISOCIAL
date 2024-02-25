import GenericModalForm from "../../../components/modals/GenericModalForm"
import { emailScheme } from "../validation"
import { FormInput } from "../../../components/form-components"
import PropTypes from 'prop-types'
import spinnerSrc from '../../../assets/icons/spinner.svg'
import styles from '../Forgot-password.module.scss'

export const SendRestoreLinkForm = ({ handleSubmit, isError }) => (
    <>
        <GenericModalForm
            title="Reset your password"
            initialValues={{ email: "" }}
            validationSchema={emailScheme}
            handleSubmit={handleSubmit}
            submitButtonText="Search"
            spinnerSrc={spinnerSrc}
        >
            <p className={styles.modalP}>
                Please enter your email to search for your account.
            </p>
            <div style={{ padding: '18px' }}>
                <input hidden type="text" autoComplete="username"></input>
                <FormInput
                    name="email"
                    id="email"
                    placeholder="Email"
                    size="small"
                    autoComplete="email"
                    fullWidth
                    type='email'
                />
            </div>
        </GenericModalForm>
        {isError && <p className={styles.error}>Cannot find your account</p>}
    </>
)

SendRestoreLinkForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired
}