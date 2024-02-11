// This is the Index component, representing the default view for the "contacts" route.

// Importing React for creating functional components
import React from "react";

// Functional component for the default view of the "contacts" route
export default function Index() {
  return (
    // Rendered JSX for the component
    <p id="zero-state">
      {/* Information about the demo */}
      This is a demo for React Router.
      <br />
      {/* Link to the React Router documentation */}
      Check out{" "}
      <a href="https://reactrouter.com">
        the docs at reactrouter.com
      </a>
      .
    </p>
  );
}
