// Import necessary React and ReactDOM modules
import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Importing react-router-dom modules for routing
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importing styles for the application
import "./index.css";

// Importing ErrorPage component for error handling
import ErrorPage from "./error-page";

// Importing components and associated loaders/actions for different routes
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import EditContact, {
  action as editAction,
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";

import Index from "./routes/index";

// Create a BrowserRouter with the specified routes and configurations
const router = createBrowserRouter([
  {
    // Root route
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        // Nested route for handling contacts
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> }, // Index route for contacts
          {
            // Detail route for a specific contact
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            // Edit route for a specific contact
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            // Destroy (delete) route for a specific contact
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

// Render the application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide the router to the application using RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
