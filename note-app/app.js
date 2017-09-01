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
        notes.addNote(argv.title, argv.body);
        break;

    case 'read':
        notes.read(argv.title)
        break;

    case 'list':
        console.log('Listing notes');
        break;

    case 'remove':
        notes.removeNote(argv.title);
        break;
    default:
        console.log('Command not recognized');
        break;
}