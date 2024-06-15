export async function getOpenTabId() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.id);
    return tab.id;
}

export function sendCommandToTab(id, command) {
    chrome.tabs.sendMessage(id, {
        action: command,
    });
}