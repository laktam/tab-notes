# Tabe Notes

A browser extension that allows users to take notes on the current tab, save them locally, view each page notes from the extension button and view all notes from a dedicated page. It provides a convenient way to keep track of notes related to specific tabs or websites.

## Features

- **Take Notes**: Add notes related to the currently active tab.
- **View Current Page Notes**: Access notes saved on current page.
- **View All Notes**: Access all saved notes from a dedicated page.
- **Persist Notes**: Saves notes locally using `chrome.storage`.
- **Note search**: Search across all saved notes.
- **Keyboard Shortcut**: Quickly open the note-taking interface using `Ctrl+Shift+Q` (or `MacCtrl+Shift+Q` on macOS).
- **Drag & Drop UI**: The note-taking interface can be dragged around the screen and resized.

## Installation

1. Clone the repository or download the files.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click on **Load unpacked** and select the `build` folder where this extension is located.
5. The extension will now be available in your browser.

## Usage

- **Open the Note Interface**: 
  - You can open the note-taking interface by using the shortcut `Ctrl+Shift+Q`.
  
- **Save Notes**:
  - Write your note, and click **Save** to store it locally. The note is tied to the current tab (identified by its URL and title).

- **View Current Tab Notes**:
  - Click the extension icon to display notes saved on this website.
  - 
- **View All Notes**:
  - Click the **View all notes** link on the popup to view and search all notes across different tabs.


## Keyboard Shortcut

You can open and close the note-taking UI on the current tab using the following keyboard shortcut:
- **Windows/Linux**: `Ctrl+Shift+Q`
- **Mac**: `MacCtrl+Shift+Q`

## Permissions

The extension requires the following permissions:
- `activeTab` and `tabs`: To interact with the current tab.
- `storage`: To save and retrieve notes.
