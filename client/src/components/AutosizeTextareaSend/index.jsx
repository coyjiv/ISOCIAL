import { TextareaAutosize } from "@mui/material";
import { IoSend } from "react-icons/io5";
import Spinner from "../Spinner";
import { Formik, Form, useField } from "formik";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from './styles.module.scss';
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const CustomTextInput = ({ ...props }) => {
    const [field] = useField(props);
    return (
        <TextareaAutosize autoFocus={props?.autoFocus} onKeyDown={props.onKeyDown} {...field} {...props} />
    );
};

CustomTextInput.propTypes = {
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    onKeyDown: PropTypes.func
}

export const AutosizeTextareaSend = ({ onSubmit, validationScheme, validateOnBlur = true, validateOnMount = true, placeholder, wrapperClassname, btnClassname, textAreaClassname, autoFocus, withEmojiPicker = false }) => {

    const wrapperClassName = classNames(styles.inputCommentWrapper, wrapperClassname);
    const btnClassName = classNames(styles.inputSendBtn, btnClassname);
    const textAreaClassName = classNames(styles.commentInput, textAreaClassname);

    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const onEmojiClick = (emojiObject, setFieldValue, prevValue) => {
        console.log(emojiObject.emoji.emoji);
        setFieldValue("text", prevValue + emojiObject.emoji);
        setEmojiPickerOpen(false);
    };

    const handleKeyDown = (event, submitForm) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitForm();
        }
    };
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
            {({ isSubmitting, isValid, submitForm, setFieldValue, values }) => (
                <Form>
                    <div className={wrapperClassName}>
                        <button type="submit" disabled={!isValid} className={btnClassName}>{isSubmitting ? <Spinner /> : <IoSend />}</button>
                        {withEmojiPicker && (
                            <button type="button" onClick={() => setEmojiPickerOpen(!isEmojiPickerOpen)}>
                                {/* Emoji Icon/Button to toggle picker */}
                                🌈
                            </button>
                        )}
                        <CustomTextInput
                            name="text"
                            type="text"
                            placeholder={placeholder}
                            className={textAreaClassName}
                            autoFocus={autoFocus}
                            onKeyDown={(event) => handleKeyDown(event, submitForm)}
                        />
                        {isEmojiPickerOpen && (
                            <EmojiPicker searchDisabled emojiVersion='apple' onEmojiClick={(emojiObject) => onEmojiClick(emojiObject, setFieldValue, values.text)} />
                        )}
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
    autoFocus: PropTypes.bool,
    withEmojiPicker: PropTypes.bool
}