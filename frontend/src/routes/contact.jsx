// Importing necessary components and functions from react-router-dom and contacts module
import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

// Action function for updating contact's favorite status
export async function action({ request, params }) {
  // Extracting form data from the request
  let formData = await request.formData();
  
  // Updating contact's favorite status based on form data
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// Loader function for fetching contact data by contactId
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  
  // If contact is not found, throw a 404 error response
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  // Return the contact data
  return { contact };
}

// Contact component for rendering contact details
export default function Contact() {
  // Loading contact data using useLoaderData hook
  const { contact } = useLoaderData();

  return (
    // Container for contact details
    <div id="contact">
      <div>
        {/* Displaying contact avatar */}
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        {/* Displaying contact name and favorite status */}
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {/* Displaying favorite status using Favorite component */}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          // Displaying Twitter handle if available
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* Form for navigating to the edit page */}
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          {/* Form for deleting the contact with confirmation */}
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Favorite component for displaying and updating the favorite status
function Favorite({ contact }) {
  // Accessing fetcher and formData using useFetcher hook
  const fetcher = useFetcher();

  // Initializing favorite status
  let favorite = contact.favorite;

  // Updating favorite status based on form data if available
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    // Form for updating favorite status
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {/* Displaying star or empty star based on favorite status */}
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
