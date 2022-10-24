const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const dbRaw = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(dbRaw);
        return contactsList;
    } catch (error) {
        console.error(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contactsList = await listContacts();
        const contact = contactsList.find(contact => contact.id === contactId);
        if (!contact) {
            return null;
        }
        return contact
    } catch (error) {
        console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contactsList = await listContacts();
        const index = contactsList.findIndex(contact => contact.id === contactId);

        if (index < 0) {
            return null;
        }

        contactsList.splice(index, 1)

        await fs.writeFile(contactsPath, JSON.stringify(contactsList));
        return index
    } catch (error) {
        console.error(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const id = nanoid();
        const contact = { id, name, email, phone };
        const contactsList = await listContacts();

        contactsList.push(contact);
        await fs.writeFile(contactsPath, JSON.stringify(contactsList));

        return contact;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
