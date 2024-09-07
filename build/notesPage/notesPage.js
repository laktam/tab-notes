main();
var selectedNotesKey = ""
const globalNotesList = []

function main() {
    loadAllNotes()
    
    const sidebar = document.getElementById("sidebar");
    
    chrome.storage.local.get("notes").then((result) => {
        console.log(`note on local storage : `,result);
        const notes = result["notes"];
        for (const notesKey in notes) {
            const notesList = notes[notesKey];
            const pageKeyDiv = document.createElement('div');
            pageKeyDiv.className = "pageKeyDiv"
            pageKeyDiv.innerText = notesKey
            console.log("notes key", notesKey)
            pageKeyDiv.addEventListener('click',
                ()=>{
                    // result.innerHTML =
                    selectedNotesKey = notesKey
                    searchNotes("", notesKey) 
                }
            )
            sidebar.append(pageKeyDiv)
        }
        searchNotesGlobaly("")
    })

}

document.getElementById('search').addEventListener('keyup', () => {
    const keyword = document.getElementById('search').value;
    if(selectedNotesKey == ""){
        selectedNotesKey = getNoteKeyFromURL();
    }
    // searchNotes(keyword, selectedNotesKey);
    searchNotesGlobaly(keyword)
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
                noteDiv.innerHTML = `<div class="note"><div class="noteTitle">${note.title}</div>
                        <a href="${note.link}" target="_blank">[${note.link}]</a>
                        <div>
                         ${note.content}
                        </div></div>
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

function loadAllNotes(){
    chrome.storage.local.get("notes").then((result) => {
        const notes = result["notes"] || [];
        for (const notesKey in notes) {
            const localNotesList = notes[notesKey];

            for (let note of localNotesList) {
                // const noteString = note.title + note.content + note.link;
                // const noteString = `${note.title}
                //         ${note.link}
                //         ${note.content}
                //         `
                globalNotesList.push(note)
            }
            console.log("global ", globalNotesList)
        }})
        
}


function searchNotesGlobaly(keyword) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = "";
    // const globalNotesList = []

    // chrome.storage.local.get("notes").then((result) => {
    //     const notes = result["notes"] || [];
    //     for (const notesKey in notes) {
    //         const localNotesList = notes[notesKey];

    //         for (let note of localNotesList) {
    //             // const noteString = note.title + note.content + note.link;
    //             const noteString = `${note.title}
    //                     ${note.link}
    //                     ${note.content}
    //                     `
    //             globalNotesList.push(noteString)
    //         }
    //         console.log("global ", globalNotesList)
    //     }

        for (let note of globalNotesList) {
            const noteString = note.title + note.content + note.link;
            if (noteString.toLowerCase().includes(keyword.toLowerCase())) {
                const noteDiv = document.createElement('div');
                noteDiv.innerHTML = `<div class="note"><div class="noteTitle">${note.title}</div>
                        <a href="${note.link}" target="_blank">[${note.link}]</a>
                        <div>
                         ${note.content}
                        </div></div>
                         `
                resultDiv.appendChild(noteDiv);
            }
        }
    // });

        

}
