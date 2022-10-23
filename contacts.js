const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    try {
        const dbRaw = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(dbRaw);
        return contactsList;
    }
    catch (error) {
        console.error(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contactsList = await listContacts();
        const contact = contactsList.find((contact) => contact.id === contactId);
        if (!contact) {
            return console.log(`Sorry, contact with id: ${contactId} is not found`);
        }
        return console.log('Selected contact:', contact);
    }
    catch (error) {
        console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contactsList = await listContacts();
        const contact = contactsList.find((contact) => contact.id === contactId);

        if (!contact) {
            return console.log(`Sorry, contact with id: ${contactId} is not found`);
        }

        const newContactsList = contactsList.filter((contact) => contact.id !== contactId);

        await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        return console.log(`Contact with id: ${contactId} has been removed from list`);
    }
    catch (error) {
        console.error(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const id = nanoid();
        const contact = { id, name, email, phone };
        const contactsList = await listContacts();

        if (contactsList.find(contact => contact.name === name)) { return console.log(`Contact witn name ${name} is already in list`) }

        if (contactsList.find(contact => contact.email === email)) { return console.log(`Contact witn email ${email} is already in list`) }

        contactsList.push(contact);
        await fs.writeFile(contactsPath, JSON.stringify(contactsList));

        return contact;
    }
    catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};