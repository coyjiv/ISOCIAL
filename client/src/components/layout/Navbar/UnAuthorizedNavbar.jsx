import { useNavigate } from "react-router";
import { BlueRoundedButton } from "../../buttons";
import styles from './unauthorized.module.scss'

export const UnAuthorizedNavbar = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  }

  return (
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
  );
};