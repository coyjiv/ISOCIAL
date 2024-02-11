//libs
import { Formik, Field, Form } from 'formik';
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
import open from './icons/open.svg'
import closed from './icons/closed.svg'
//api
import { API_URL } from '../../api/config.js';

const LoginForm = () => {
    const [userId, setUserId] = useLocalStorage('userId', null)
    const [isFailed, setFailed] = useState(false);

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
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
        } else {
            setFailed(true);
        }
        setSubmitting(false);
        navigate("/")
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ errors, isSubmitting }) => (
                <Form className={styles.form}>
                    <Field className={`${styles.field} ${errors.email && styles.error}`} type="text" id="email"
                        name="email" placeholder="Email" />
                    <div className={styles.password}>
                        <Field className={`${styles.field} ${errors.password && styles.error}`}
                            type={isPasswordHidden ? 'password' : 'text'}
                            id="password" name="password" placeholder="Password" />
                        <img onClick={() => setIsPasswordHidden(prev => !prev)}
                            src={isPasswordHidden ? closed : open}
                            alt="eye" className={styles.eye} />
                    </div>

                    {isSubmitting ?
                        <img src={spinner} alt="spinner" className={styles.spinner} />
                        :
                        <button type="submit" className={styles.submitBtn}>Sign in</button>
                    }
                    {isFailed && <p className={styles.wrongPass}>You entered an incorrect login or password.</p>}
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;