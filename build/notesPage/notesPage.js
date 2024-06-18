main();

function main() {

}

document.getElementById('search').addEventListener('keyup', () => {
    const keyword = document.getElementById('search').value;
    const notesKey = getNoteKeyFromURL();
    searchNotes(keyword, notesKey);
})

function searchNotes(keyword, notesKey) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = "";
    chrome.storage.local.get("notes").then((result) => {
        const notes = result["notes"] || [];
        const localNotesList = notes[notesKey];

        for (let note of localNotesList) {
            const noteString = note.title + note.content + note.link;
            if (noteString.toLowerCase().includes(keyword.toLowerCase())) {
                const noteDiv = document.createElement('div');
                noteDiv.innerText = `${note.title}
                    ${note.link}
                    ${note.content}
                    `
                resultDiv.appendChild(noteDiv);
            }
        }

    });
}

function getNoteKeyFromURL() {
    let urlString = window.location.href;
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
        // console.log("Value is: " + pair[1]);
        if (pair[0] == "notesKey") {
            return pair[1];
        }
    }
}