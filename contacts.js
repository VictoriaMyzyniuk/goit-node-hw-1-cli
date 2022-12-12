const fs = require("fs/promises");
// OR  const fs = require("fs").promises;

const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// OR const contactsPath = path.resolve( "db", "contacts.json");

// =====================  ALL CONTACTS  ==================
async function listContacts() {
  let contacts;
  await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => (contacts = JSON.parse(data)))
    .catch((error) => console.log(error));
  // console.log(contacts);
  return contacts;
}
// listContacts();

// =====================  GET CONTACT BY ID  ================
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contactId === contact.id);
  // console.log(result);
  if (!result) {
    return null;
  }
  return result;
}
// getContactById("4");

// =====================  ADD CONTACT  ==================
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
  // console.table(contacts);
  return newContact;
}
const newContact = {
  name: "Kate V",
  email: "kate.v@yahoo.com",
  phone: "123456789",
};
// addContact(newContact);

// =====================  REMOVE CONTACT  ==================
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  // console.log(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.log(removedContact);
  return removedContact;
}
// removeContact("7");

// =====================  UPDATE CONTACT BY ID  ==================
async function updateById(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.table(contacts);
  return contacts[idx];
}
// updateById("1", newContact);

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};

module.exports = contacts;
