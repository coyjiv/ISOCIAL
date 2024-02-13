//libs
import { Formik, Form } from 'formik';
import { FormInput } from '../../components/form-components';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from 'usehooks-ts';
//validation
import { validationSchema } from "./validation.js"
//styles
import styles from './styles.module.scss'
//icon
import spinner from '../../assets/icons/spinner.svg'
//api
import { API_URL } from '../../api/config.js';
import { BlueRoundedButton } from '../../components/buttons';

const LoginForm = () => {
    const [userId, setUserId] = useLocalStorage('userId', null)
    const [isFailed, setFailed] = useState(false);

    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        const response = await fetch(API_URL + '/auth/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if (response.status === 200) {
            resetForm();
            const res = await response.json();
            const decoded = await jwtDecode(res.access);

            if (userId !== decoded.id) {
                setUserId(parseInt(decoded.id));
            }

            localStorage.setItem("access", res.access);
            localStorage.setItem("refresh", res.refresh);
            navigate("/")

        } else {
            setFailed(true);
        }
        setSubmitting(false);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {({ isSubmitting, isValid }) => (
                <Form className={styles.form}>
                    <FormInput
                        name="email"
                        id="email"
                        placeholder="Email"
                        size="small"
                        autoComplete="email"
                        fullWidth
                    />
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

                    {isSubmitting ?
                        <img src={spinner} alt="spinner" className={styles.spinner} />
                        :
                        <BlueRoundedButton disabled={!isValid} type="submit" className={styles.submitBtn}>Sign in</BlueRoundedButton>
                    }
                    {isFailed && <p className={styles.wrongPass}>You entered an incorrect login or password.</p>}
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;