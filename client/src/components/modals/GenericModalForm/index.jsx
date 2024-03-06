import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { BlueRoundedButton } from '../../buttons';
import PropTypes from 'prop-types';
import styles from './GenericModalForm.module.scss';

const GenericModalForm = ({
    title,
    initialValues,
    validationSchema,
    handleSubmit,
    children,
    backLink = "/login",
    backLinkText = "Back to login",
    submitButtonText,
    spinnerSrc = '../../../assets/icons/spinner.svg'
}) => (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
    >
        {({ isSubmitting, isValid }) => (
            <Form>
                <div className={styles.modal}>
                    <h2 className={styles.modalH2}>{title}</h2>
                    <div className={styles.modalLine}></div>
                    {children}
                    <div className={styles.modalLine}></div>
                    <div className={styles.modalBtn}>
                        <Link to={backLink} className={styles.btnCancel}>{backLinkText}</Link>
                        {isSubmitting ? (
                            <img src={spinnerSrc} alt="spinner" className={styles.spinner} />
                        ) : (
                            <BlueRoundedButton type="submit" disabled={!isValid}>
                                {submitButtonText}
                            </BlueRoundedButton>
                        )}
                    </div>
                </div>
            </Form>
        )}
    </Formik>
);

export default GenericModalForm;

GenericModalForm.propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    validationSchema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    backLink: PropTypes.string,
    backLinkText: PropTypes.string,
    submitButtonText: PropTypes.string.isRequired,
    spinnerSrc: PropTypes.string
};