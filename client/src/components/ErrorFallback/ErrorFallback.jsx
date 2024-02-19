import { useRouteError } from "react-router";
import { ErrorPage } from "../Errors/Error";

function ErrorFallback() {
  const error = useRouteError();

  const statusCode = error?.status;
  const title =
    error?.status === 404
      ? "Page not found"
      : error?.status === 401
        ? "Unauthorized"
        : "Oh no! An error occurred.";
  const description =
    error?.status === 404
      ? "Page not found"
      : error.status === 401
        ? "You need to be logged in to view this page."
        : "An error occurred on the server. Please try again later. If the problem persists, contact support.";

  return (
    <ErrorPage
      statusCode={statusCode}
      title={title}
      description={description}
      customLinkUrl={error.status === 401 ? "login" : null}
      customLinkText={error.status === 401 ? "Go to login" : null}
    />
  );
}
export { ErrorFallback };
