// Importing necessary hook from react-router-dom
import { useRouteError } from "react-router-dom";

// ErrorPage component for rendering error details
export default function ErrorPage() {
  // Accessing the route error using useRouteError hook
  const error = useRouteError();

  // Logging the error details to the console
  console.error(error);

  return (
    // Container for displaying error information
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* Displaying error status text or message in italics */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
