# Leads Tracker — Link Saver Chrome Extension (PDF Export)

A simple Chrome extension to quickly save useful links (from an input or your current tab), view them in a clean UI, and export your saved links to a PDF using the browser print dialog.

## Features

- ✅ Save a link by pasting a URL
- ✅ Save the active browser tab URL in one click
- ✅ Links are stored locally using `localStorage`
- ✅ View saved links in a clean, modern UI
- ✅ Export saved links to **PDF** (opens a printable page → "Save as PDF")
- ✅ Double-click to delete all saved links

## Tech Used

- HTML
- CSS
- JavaScript
- Chrome Extensions (Manifest V3)
- Browser Print → PDF export


## How It Works

- Saved links are stored in the browser using:
  - `localStorage.setItem("myLeads", JSON.stringify(myLeads))`
- The popup loads and renders saved links from `localStorage`
- Export PDF:
  - Opens a new tab containing a clean HTML list of links
  - Automatically triggers the print dialog
  - You choose **Save as PDF**

## Install Locally (Load as Unpacked Extension)

1. Download or clone this repository.
2. Open Chrome and go to:
   - `chrome://extensions/`
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked**.
5. Select the folder that contains `manifest.json`.

The extension should appear in your extensions list. Pin it for easy access.

## Usage

1. Click the extension icon to open the popup.
2. Use:
   - **SAVE INPUT** → saves the URL you typed
   - **SAVE TAB** → saves the currently open tab URL
   - **EXPORT PDF** → opens printable page and prompts you to save as PDF
   - **DELETE ALL** → double-click to clear all saved links

## Export to PDF

1. Click **EXPORT PDF**
2. A new tab opens with your saved links
3. Print dialog appears
4. Choose **Save as PDF**

## Permissions

This extension uses:

- `tabs` permission to read the current active tab URL (for **SAVE TAB**)

## Screenshots

> Add screenshots here if you want:
- Popup UI
- Export page

## Future Improvements

- Prevent duplicate links
- Add delete-per-item option
- Add categories/tags
- Search / filter saved links
- Sync using Chrome storage instead of `localStorage`

## License

This project is open-source. You may add an MIT License if you plan to share publicly.


