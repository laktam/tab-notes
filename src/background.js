import { getOpenTabId, sendCommandToTab } from "./utils/backgroundUtils"

//send open terminal command on current tab when shortcut is clicked
chrome.commands.onCommand.addListener(function (command) {
    console.log("listener added")
    if (command === "open-note") {
        console.log("open-note received")
        getOpenTabId().then((id) => {
            console.log(
                "open note command on id  ",
                id
            );
            sendCommandToTab(id, "open-note");
        });
    }
    return true;
})