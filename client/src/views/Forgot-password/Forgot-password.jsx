import styles from "./Forgot-password.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { signupSchema } from "./validation";
import { useDocumentTitle } from "usehooks-ts";
import { FormInput } from "../../components/form-components";
import { BlueRoundedButton } from "../../components/buttons";
import spinner from '../../assets/icons/spinner.svg'


const ForgotPassword = () => {

  const navigation = useNavigate();

  const navigateToLogin = () => {
    navigation("/login");
  };
  const handleSubmit = async (values) => {

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(values);
      }, 1000);
    });

    return promise.then((values) => {
      console.log(values);
    });
  };

  useDocumentTitle("Forgot password");
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerH1Div}>
          <h1 className={styles.headerH1}>
            iSocial
          </h1>
        </div>
        <div className={styles.headerDivPassword}>
          <BlueRoundedButton onClick={navigateToLogin}>Sign in</BlueRoundedButton>
        </div>
      </header>
      <main className={styles.main}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <div className={styles.modal}>
                <h2 className={styles.modalH2}>Reset your password</h2>
                <div className={styles.modalLine}></div>
                <p className={styles.modalP}>
                  Please enter your email or mobile number to search for your account.
                </p>
                <div style={{ padding: '18px' }}>
                  <FormInput
                    name="email"
                    id="email"
                    placeholder="Email"
                    size="small"
                    autoComplete="email"
                    fullWidth
                    type='email'
                  />
                </div>
                <div className={styles.modalLine}></div>
                <div className={styles.modalBtn}>
                  <Link to="/login" className={styles.btnCancel}>Back to login</Link>
                  {isSubmitting ?
                    <img src={spinner} alt="spinner" className={styles.spinner} />
                    :
                    <BlueRoundedButton type="submit" disabled={!isValid}>Search</BlueRoundedButton>
                  }
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default ForgotPassword;
