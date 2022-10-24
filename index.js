const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await listContacts();
            console.table(contactsList);
            break;

        case 'get':
            const contact = await getContactById(id);
            console.log('Selected contact:', contact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log('New contact was add:', newContact);
            break;

        case 'remove':
            await removeContact(id);
            console.log(
                `Contact with id: ${id} has been removed from list`
            )
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
