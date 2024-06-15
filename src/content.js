import { createNote } from "./utils/contentUtils";

console.log("from content")
// listen for open-note command to create a note in the tab
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.action === "open-note") {
        createNote();
    }

    sendResponse();
    return true;
})