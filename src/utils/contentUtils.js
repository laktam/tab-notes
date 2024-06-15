export function createNote() {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');

    // Apply styles to note container
    Object.assign(noteContainer.style, {
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '300px',
        border: '2px solid #ccc',
        backgroundColor: '#f9f9f9',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        resize: 'both',
        overflow: 'auto',
        zIndex: '1000'
    });

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

    // Add the note container to the body
    document.body.appendChild(noteContainer);

    // Make the note draggable
    makeDraggable(noteContainer);
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

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