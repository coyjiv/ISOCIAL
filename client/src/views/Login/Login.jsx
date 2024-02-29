//libs
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
//components
import LoginForm from './LoginForm';
//styles
import styles from './styles.module.scss'
//images
import GLink from './icons/google_icon.svg';
import { API_URL } from "../../api/config";

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
            <h1 className={styles.logo}>ISOCIAL</h1>
            <div className={styles.form_wrapper}>
                <div className={styles.body}>
                    {API_URL}
                    <LoginForm/>
                    <Link to={'/forgot-password'} className={styles.forgot_password}>Forgot Password</Link>
                </div>
                <div className={styles.footer}>
                    <Link to={'/registration'} className={styles.registation_btn}>Create new account</Link>
                    <span>OR</span>
                    <a href="http://localhost:9000/oauth2/authorization/google">
                        <img src={GLink} alt="google icon" className={styles.google}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login