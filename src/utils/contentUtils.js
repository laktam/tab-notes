export function createNote() {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    Object.assign(noteContainer.style, {
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '300px',
        border: '2px solid #ccc',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        resize: 'both',
        overflow: 'auto',
        zIndex: '1000'
    });

    // Create draggable header
    const noteHeader = document.createElement('div');
    noteHeader.classList.add('note-header');
    noteHeader.innerText = 'Drag here';

    // Apply styles to note header
    Object.assign(noteHeader.style, {
        width: '100%',
        padding: '5px',
        cursor: 'move',
        backgroundColor: '#ddd',
        borderBottom: '2px solid #ccc'
    });

    noteContainer.appendChild(noteHeader);

    // Create title input
    const noteTitle = document.createElement('input');
    noteTitle.type = 'text';
    noteTitle.placeholder = 'Title';
    noteTitle.classList.add('note-title');

    // Apply styles to note title
    Object.assign(noteTitle.style, {
        width: '100%',
        fontSize: '16px',
        marginBottom: '10px',
        boxSizing: 'border-box'
    });

    noteContainer.appendChild(noteTitle);

    // Create content textarea
    const noteContent = document.createElement('textarea');
    noteContent.placeholder = 'Your note here...';
    noteContent.classList.add('note-content');

    // Apply styles to note content
    Object.assign(noteContent.style, {
        width: '100%',
        height: '100px',
        boxSizing: 'border-box'
    });

    noteContainer.appendChild(noteContent);

    // save button
    const saveButton = document.createElement('button');
    saveButton.innerText = "Save";
    saveButton.style.float = "right";
    saveButton.style.border = "solid 2px gray";
    saveButton.style.padding = "3px";
    saveButton.style.margin = "5px";
    saveButton.addEventListener('click', () => {
        addNoteToList({
            title: noteTitle.value,
            content: noteContent.value
        })
    })


    noteContainer.appendChild(saveButton);



    // Add the note container to the body
    document.body.appendChild(noteContainer);

    // Make the note draggable
    makeDraggable(noteContainer, noteHeader);
}

function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// function getNoteListByKey(callback) {
//     //get current page info
//     let site = location.hostname,
//         title = document.title;
//     let notesKey = title + " " + "[" + site + "]";
//     console.log("notse key in content script : ", notesKey);

//     chrome.storage.local.get(notesKey).then((result) => {
//         console.log("Value is " + result[notesList]);
//         callback(result[notesList])
//     });


// }


// note should be an object {title, content}
function addNoteToList(note) {

    //get current page info
    let site = location.hostname,
        title = document.title;
    let notesKey = title + " " + "[" + site + "]";
    console.log("noteskey ", notesKey);
    // get notelist
    chrome.storage.local.get(notesKey).then((result) => {
        console.log("before Value is " + result[notesKey]);
        const notesList = result[notesKey] || []; // in case the notelist is undefined
        // add note to list
        notesList.push(note);
        chrome.storage.local.set({ [notesKey]: notesList }).then(() => {
            console.log("Value is set ", notesList);
        });
    });


}