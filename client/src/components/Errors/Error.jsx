import styles from './Error.module.scss'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ErrorPage = ({
  statusCode,
  title,
  description,
  customLinkUrl,
  customLinkText,
}) => {
  return (
    <main className={styles.notFoundContainer}>
      <div className={styles.textCenter}>
        <p className={styles.statusCode}>{statusCode}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actionLinks}>
          <Link to={customLinkUrl ?? "/"} className={styles.homeLink}>
            {customLinkText ?? "Go back home"}
          </Link>
        </div>
      </div>
    </main>
  );
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  customLinkText: PropTypes.string,
  customLinkUrl: PropTypes.string,
};

ErrorPage.defaultProps = {
  statusCode: 404,
  title: "Page not found",
  description: "Sorry, we couldn’t find the page you’re looking for.",
};
