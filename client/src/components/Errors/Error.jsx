import "./Error.scss";
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
    <main className="not-found-container">
      <div className="text-center">
        <p className="status-code">{statusCode}</p>
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
        <div className="action-links">
          <Link to={customLinkUrl ?? "/"} className="home-link">
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
