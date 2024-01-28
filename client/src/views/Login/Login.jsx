import {Link} from "react-router-dom";
import LoginForm from './LoginForm';
import GLink  from './google_icon.svg';


import "./Login.scss";
import "../../index.scss"

const Login = () => {

  const handleLogin = (values) => {
    // Implement login logic, e.g., call an API
    console.log('Login submitted with values:', values);
  };


  return (
    <div className="container">
      <div className="login__container">
        <div className="logo">ISocial</div>
        <LoginForm onSubmit={handleLogin} />
        <Link className="forgot-btn" to="/register">Forgot password</Link>
        <div className="horizontal-line"></div>
        <h4 className="register-txt">or</h4>
        <Link className="register-btn" to="/register"> Create an account</Link>
        <Link className="forgot-btn" to="http://localhost:9000/oauth2/authorization/google"><img src={GLink}></img><div>Sign in via Google</div></Link>
      </div>
    </div>
  )
}

export default Login