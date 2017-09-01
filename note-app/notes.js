const fs = require('fs')

var getAll = () => {
    return fetchNotes();
}


var fetchNotes = () => {

    try {
        var notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}


var addNote = (title, body) => {

    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;

    }
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filtered = notes.filter(note => note.title !== title)
    if (filtered.length === notes.length) {
        return false;
    } else {
        saveNotes(filtered);
        return true;
    }
};


var read = (title) => {
    debugger;
    var notes = fetchNotes();
    var noteFound = notes.filter(note => note.title === title)
    if (noteFound.length !== 0)
        return noteFound[0];
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
    getAll,
    read
}