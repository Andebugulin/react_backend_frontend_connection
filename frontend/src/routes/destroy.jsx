// Importing necessary function from react-router-dom and contacts module
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// Action function for handling deletion of a contact
export async function action({ params }) {
  // Calling the deleteContact function to delete the contact by contactId
  await deleteContact(params.contactId);
  
  // Redirecting to the home page after successful deletion
  return redirect("/");
}
