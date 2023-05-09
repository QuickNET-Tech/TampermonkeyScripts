
// ==UserScript==
// @name         EnforceLatestVideosYT
// @namespace    https://github.com/QuickNET-Tech/
// @version      1
// @description  Clicks the "Latest" button when visiting a YouTuber's "Videos" tab on their channel
// @match        https://www.youtube.com/*/videos
// @grant        none
// ==/UserScript==

async function getElementOfLatestChipButton() {
    var element = null;

    while (element == null) {
        var chip = document.querySelector('[title="Latest"]');

        if (chip == null) {
            await new Promise(resolve => setTimeout(resolve, 50));
        } else {
            element = chip.parentElement;
        }
    }

    return element;
}


async function scriptmain() {
    'use strict';

    let element = await getElementOfLatestChipButton();

    element.dispatchEvent(new Event('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
}

scriptmain();
