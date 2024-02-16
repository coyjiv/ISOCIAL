//libs
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
//components
import LoginForm from './LoginForm';
//styles
import styles from './styles.module.scss'
//images
import GLink from './icons/google_icon.svg';
import { Typography } from "@mui/material";


const Login = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const accessQuery = searchParams.get("access");
        const refreshQuery = searchParams.get("refresh");
        if (accessQuery && refreshQuery) {
            setSearchParams('');
            localStorage.setItem("access", accessQuery);
            localStorage.setItem("refresh", accessQuery);
            navigate("/");
        }


        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        if (refresh || access) {
            navigate("/")
        }
        //eslint-disable-next-line
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <h1 className={styles.logo}>iSocial</h1>
                <Typography className={styles.slogan}>iSpeak. iLike. iSocial.</Typography>
            </div>
            <div className={styles.formWrapper}>
                <div className={styles.body}>
                    <LoginForm />
                    <Link to={'/forgot-password'} className={styles.forgotPassword}>Forgot Password</Link>
                </div>
                <div className={styles.footer}>
                    <Link to={'/register'} className={styles.registrationBtn}>Create new account</Link>
                    <span>OR</span>
                    <Link className={styles.signInWithGoogleBtn} to="/oauth2/authorization/google">
                        <img src={GLink} alt="google icon" className={styles.google} />
                        <Typography>Continue with Google</Typography>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login