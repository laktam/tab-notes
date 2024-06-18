main();


function main() {
    displayNotesList();
}



function displayNotesList() {
    // getOpenTabId().then((openTabId) => {
    // chrome.runtime.sendMessage({ action: "get-note-key" },
    //     (response) => {
    //         console.log(" response ", response);
    //         chrome.storage.local.get(notesKey).then((result) => {
    //             const notesList = result[notesKey] || []; // in case the notelist is undefined
    //             for (let note of notesList) {
    //                 displayNote(note);
    //             }
    //         });
    //     }
    // )

    // Get the current tab to send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "get-note-key" }, function (response) {
            console.log(" response ", response);
            let { notesKey } = response;
            chrome.storage.local.get(notesKey).then((result) => {
                const notesList = result[notesKey] || []; // in case the notelist is undefined
                for (let note of notesList) {
                    displayNote(note);
                }
            });
        });
    });

}

function displayNote(note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = "note";
    const titleDiv = document.createElement('div');
    titleDiv.innerText = note.title;
    titleDiv.className = "noteTitle";

    const contentDiv = document.createElement('div');
    contentDiv.innerText = note.content;
    contentDiv.className = "noteContent";
    noteDiv.append(titleDiv, contentDiv);
    console.log("link : ", note.link)
    //style


    document.getElementById('notes').appendChild(noteDiv);
}

async function getOpenTabId() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.id);
    return tab.id;
}