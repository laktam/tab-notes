
function displayNotesList() {
    //get current page info
    let site = location.hostname,
        title = document.title;
    let notesKey = title + " " + "[" + site + "]";
    console.log("noteskey ", notesKey);
    chrome.storage.local.get(notesKey).then((result) => {
        const notesList = result[notesKey] || []; // in case the notelist is undefined
        for (let note of notesList) {

        }
    });
}

function displayNote(note) {
    const noteDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.innerText = note.title;
    const contentDiv = document.createElement('div');
    contentDiv.innerText = note.content;
    noteDiv.append(titleDiv, contentDiv);

    document.getElementById('notes').appendChild(noteDiv);
}