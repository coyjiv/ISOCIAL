import "./Forgot-password.scss";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { signupSchema } from "./validation";

const ForgotPassword = () => {
  const handleSubmit = (values) => {
    console.log(values.login);
  };
  return (
    <div>
      <Formik
        initialValues={{
          login: "",
          password: "",
          account: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <header className="header">
              <div className="header-h1-div">
                <h1 className="header-h1">iSocial</h1>
              </div>
              <div className="header-div-password">
                <input
                  className="header-input"
                  type="text"
                  name="login"
                  onChange={handleChange}
                  value={values.login}
                  placeholder="Електронна адреса або номер телефону"
                />
                <p className="header-login-errors">
                  {errors.login && touched.login && errors.login}
                </p>
                <input
                  className="header-input"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Пароль"
                />
                <p className="header-password-errors">
                  {errors.password && touched.password && errors.password}
                </p>
                <button className="header-btn">Увійти</button>
                <Link href="#" className="header-div-password-a">
                  Забули назву облікового запису?
                </Link>
              </div>
            </header>
            <main className="main">
              <div className="modal">
                <h2 className="modal-h2">Знайдіть свій обліковий запис</h2>
                <div className="modal-line"></div>
                <p className="modal-p">
                  Please enter your email or mobile number to search for your
                  account.
                </p>
                <input
                  className="modal-input"
                  type="text"
                  name="account"
                  onChange={handleChange}
                  value={values.account}
                  placeholder="Ел.адреса або номер телефону"
                />
                <p className="main-account-errors">
                  {errors.account && touched.account && errors.account}
                </p>
                <div className="modal-line"></div>
                <div className="modal-btn">
                  <button className="btn-cancel">Скасувати</button>
                  <button className="btn-find">Шукати</button>
                </div>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
