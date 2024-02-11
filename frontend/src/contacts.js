import axios from "axios";

export async function getContacts() {
  let response = await axios.get("http://localhost:3001/contacts");
  let contacts = response.data;
  if (!contacts) contacts = [];
  return contacts;
}

export async function createContact() {
  let response = await axios.post("http://localhost:3001/contacts");
  return response.data;
}

export async function getContact(id) {
  let response = await axios.get(`http://localhost:3001/contacts/${id}`);
  return response.data;
}

export async function updateContact(id, updates) {
  let response = await axios.patch(
    `http://localhost:3001/contacts/${id}`,
    updates,
  );
  return response.data;
}

export async function deleteContact(id) {
  let response = await axios.delete(`http://localhost:3001/contacts/${id}`);
  return response.data;
}
