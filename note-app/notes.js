console.log(' Starting notes.js');


var addNote = (title, body) => {
    console.log('Adding note ', title, body);
};

var removeNote = (title) => {
    console.log('Removing note ', title)
};

var list = () => {
    console.log('Listing all notes')
}

var read = (title) => {
    console.log('Reading', title)
}

/*ES6 syntax for adding and removing properties to an object.
Equivalent to:
 module.exports = {
addNote: addNote,
    removeNote: removeNote
}
*/

module.exports = {
    addNote,
    removeNote,
    list,
    read
}