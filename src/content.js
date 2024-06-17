import { createNote } from "./utils/contentUtils";

console.log("from content")
// listen for open-note command to create a note in the tab
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.action === "open-note") {
        createNote();
        sendResponse();
    } else if (message.action === "get-note-key") {
        let site = location.hostname,
            title = document.title;
        let notesKey = title + " " + "[" + site + "]";
        let response = {
            notesKey
        }
        sendResponse(response);

    }

    return true;
})