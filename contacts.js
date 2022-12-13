const fs = require("fs/promises");

const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  let contacts;
  await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => (contacts = JSON.parse(data)))
    .catch((error) => console.log(error));
  // console.log(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contactId === contact.id);

  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};

module.exports = contacts;
