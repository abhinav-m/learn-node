console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash'); //Order of operations:  Node first tries to find in its core modules, not there then tries to look it up in the node_modules folder.
const yargs = require('yargs')

const notes = require('./notes');

const argv = yargs.argv;

console.log(`Yarg ${yargs.argv}`)

const command = argv._[0]

switch (command) {
    case 'add':
        let noteAdded = notes.addNote(argv.title, argv.body);
        noteAdded ? console.log(`Note added successfuly. \n-- \nTitle:${noteAdded.title} , \nBody:${noteAdded.body}`) : console.log(`Note already exists.`);
        break;

    case 'read':
        let noteRead = notes.read(argv.title);
        noteRead ? console.log(`Note read: \n-- \nTitle:${noteRead.title} \nBody:${noteRead.body}`) : console.log('Note not found.')
        break;

    case 'list':
        let allNotes = notes.getAll();
        if (allNotes.length) {
            console.log(`Printing ${allNotes.length} note(s).`)
            allNotes.forEach(v => console.log(`-- \nTitle:${v.title}, \nBody:${v.body} `))

        } else
            console.log('No notes.')
        break;

    case 'remove':
        notes.removeNote(argv.title) ? console.log('Note removed.') : console.log('Note not found.')
        break;
    default:
        console.log('Command not recognized');
        break;
}