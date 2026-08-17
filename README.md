# Kashi Birthday Website

An offline, mobile-friendly birthday site for Kashish (Kashi), from Jay. Open `index.html` in a modern browser. No server, account, or internet connection is needed after the fonts have first loaded (the site still works with browser fallback fonts if offline).

## Add the supplied photos and song

The photos and MP3 are now included in this project.

1. The photos are in `assets/photos/` and already listed in `script.js`.
2. The song is in `assets/audio/` and is already connected to the site.
3. In `script.js`, you can update photo order and captions. List solo portraits first and couple photos last.

The music begins after the quiz unlocks the cake. Most browsers require a user interaction before audio, which this flow provides.

## Quiz questions

The six questions are exactly as supplied. Any option can be selected: after all six questions have an answer, the cake surprise opens automatically. Tap **Open your letter** on the cake screen to show the final letter. The old editable answer-key values remain near the top of `script.js` only as optional notes; they no longer control access.

## Local answer journal

The **Local answer log** button is deliberately visible and states how it works: quiz selections and timestamps are stored only in the current browser’s local storage. Nothing is transmitted, and it cannot show responses from another phone or browser. The log can be cleared from the dialog or by clearing browser site data. If the page is shared, the recipient should be told that responses are stored locally on their device.

## Editing story and final letter

The text is in `index.html`. The project has no build step: edit, save, and refresh the browser.
