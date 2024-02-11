// Importing necessary components and functions from react-router-dom and contacts module
import {
    Outlet,
    NavLink,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
  } from "react-router-dom";
  import { getContacts, createContact } from "../contacts";
  import { useEffect } from "react";
  
  // Action function for creating a new contact and redirecting to its edit page
  export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }
  
  // Loader function for fetching contacts based on search query
  export async function loader({ request }) {
    // Extracting search query parameter from the request URL
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    
    // Fetching contacts based on the search query
    const contacts = await getContacts(q);
    
    // Returning contacts and search query for loader data
    return { contacts, q };
  }
  
  // Root component for rendering the main layout of the application
  export default function Root() {
    // Accessing loader data using useLoaderData hook
    const { contacts, q } = useLoaderData();
    
    // Accessing navigation, submit, and other hooks from react-router-dom
    const navigation = useNavigation();
    const submit = useSubmit();
  
    // Checking if searching is in progress
    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has("q");
  
    // Updating the search input value when the search query changes
    useEffect(() => {
      document.getElementById("q").value = q;
    }, [q]);
  
    return (
      // Main layout structure
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            {/* Form for searching contacts */}
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  // Submitting the search form on input change
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            {/* Form for creating a new contact */}
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          {/* Navigation menu for displaying contacts */}
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* NavLink for navigating to a contact's details */}
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div
          id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </div>
      </>
    );
  }
  