import { TextareaAutosize } from "@mui/material";
import { IoSend } from "react-icons/io5";
import Spinner from "../Spinner";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from './styles.module.scss';

export const AutosizeTextareaSend = ({ onSubmit, validationScheme, validateOnBlur = true, validateOnMount = true, placeholder, wrapperClassname, btnClassname, textAreaClassname }) => {

    const wrapperClassName = classNames(styles.inputCommentWrapper, wrapperClassname);
    const btnClassName = classNames(styles.inputSendBtn, btnClassname);
    const textAreaClassName = classNames(styles.commentInput, textAreaClassname);
    return (
        <Formik
            initialValues={{
                text: ''
            }}
            onSubmit={async (values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
            validateOnMount={validateOnMount}
            validateOnBlur={validateOnBlur}
            validationSchema={validationScheme}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <div className={wrapperClassName}>
                        <button type="submit" disabled={!isValid} className={btnClassName}>{isSubmitting ? <Spinner /> : <IoSend />}</button>
                        <Field type="text" name="text" placeholder={placeholder} className={textAreaClassName} as={TextareaAutosize} />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

AutosizeTextareaSend.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validationScheme: PropTypes.object.isRequired,
    validateOnBlur: PropTypes.bool,
    validateOnMount: PropTypes.bool,
    placeholder: PropTypes.string,
    wrapperClassname: PropTypes.string,
    btnClassname: PropTypes.string,
    textAreaClassname: PropTypes.string,
}