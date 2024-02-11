// Importing necessary components and functions from react-router-dom and contacts module
import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
  import { updateContact } from "../contacts";
  
  // Action function for handling form submission and updating contact data
  export async function action({ request, params }) {
    // Extracting form data from the request
    const formData = await request.formData();
    
    // Converting form data to an object for updating the contact
    const updates = Object.fromEntries(formData);
    
    // Updating the contact using the updateContact function from the contacts module
    await updateContact(params.contactId, updates);
    
    // Redirecting to the updated contact's details page
    return redirect(`/contacts/${params.contactId}`);
  }
  
  // EditContact component for rendering the contact editing form
  export default function EditContact() {
    // Loading contact data using useLoaderData hook
    const { contact } = useLoaderData();
    
    // Accessing the navigation function using useNavigate hook
    const navigate = useNavigate();
  
    return (
      // Form component for editing contact details
      <Form method="post" id="contact-form">
        <p>
          <span>Name</span>
          {/* Input fields for first and last name with default values */}
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        {/* Input field for Twitter username with default value */}
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </label>
        {/* Input field for Avatar URL with default value */}
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        {/* Textarea for entering notes with default value */}
        <label>
          <span>Notes</span>
          <textarea
            name="notes"
            defaultValue={contact.notes}
            rows={6}
          />
        </label>
        <p>
          {/* Save button for submitting the form */}
          <button type="submit">Save</button>
          {/* Cancel button for navigating back to the previous page */}
          <button type="button" onClick={() => {
            navigate(-1);
          }}>Cancel</button>
        </p>
      </Form>
    );
  }
  