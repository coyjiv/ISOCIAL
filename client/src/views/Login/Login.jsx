//libs
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
//components
import LoginForm from './LoginForm';
//styles
import styles from './styles.module.scss'
//images
import GLink from './icons/google_icon.svg';

const Login = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userId, setUserId] = useLocalStorage('userId', null);

    useDocumentTitle('Login')

    useEffect(() => {
        (async () => {
            const accessQuery = searchParams.get("access");
            const refreshQuery = searchParams.get("refresh");
            if (accessQuery && refreshQuery) {
                console.log('accessQuery', accessQuery);
                console.log('refreshQuery', refreshQuery);
                setSearchParams('');
                const decoded = await jwtDecode(accessQuery);

                if (userId !== decoded.id) {
                    setUserId(parseInt(decoded.id));
                }
                localStorage.setItem("access", accessQuery);
                localStorage.setItem("refresh", accessQuery);
                navigate("/");
            }


            const access = localStorage.getItem("access");
            const refresh = localStorage.getItem("refresh");
            if (refresh || access) {
                navigate("/")
            }

        })();
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
                    <LoginForm/>
                    <Link to={'/forgot-password'} className={styles.forgot_password}>Forgot Password</Link>
                </div>
                <div className={styles.footer}>
                    <Link to={'/register'} className={styles.registrationBtn}>Create new account</Link>
                    <span>OR</span>
                    <a className={styles.signInWithGoogleBtn} href={`https://${window.location.host}/oauth2/authorization/google`}>
                        <img src={GLink} alt="google icon" className={styles.google} />
                        <Typography>Continue with Google</Typography>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login