main();

function main() {

}

function searchNotes(keyword) {
    const resultDiv = document.getElementById('result');
    chrome.storage.local.get("notes").then((result) => {
        const notes = result["notes"] || [];


        chrome.tabs.sendMessage(activeTab.id, { action: "get-note-key" }, function (response) {
            console.log(" response ", response);
            let { notesKey } = response;
            const localNotesList = notes[notesKey];

            for (let note of localNotesList) {
                const noteString = JSON.stringify(note);
                if (noteString.toLowerCase().includes(keyword.toLowerCase())) {
                    const noteDiv = document.createElement('div');
                    noteDiv.innerText = `${note.title}
                    ${note.content}
                    `
                    resultDiv.appendChild(noteDiv);
                }
            }
        });
    });
}