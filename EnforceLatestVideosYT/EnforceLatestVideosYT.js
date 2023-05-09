
// ==UserScript==
// @name         EnforceLatestVideosYT
// @description  Clicks the "Latest" button when visiting a YouTuber's "Videos" tab on their channel
// @match        *://www.youtube.com/*
// @namespace    https://github.com/QuickNET-Tech/
// @version      1
// @grant        none
// ==/UserScript==

function initObserver() {
    let oldURL = window.location.href;

    const observer = new MutationObserver(function(mutationsList, observer) {
        if (oldURL !== window.location.href) {
            oldURL = window.location.href;
            scriptmain();
        }
    });

    observer.observe(document.querySelector('head'), { childList: true, subtree: true });
}

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

function clickLatestChip(chipElement) {
    chipElement.dispatchEvent(new Event('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
}

async function scriptmain() {
    'use strict';

    let element = await getElementOfLatestChipButton();

    clickLatestChip(element);
}

scriptmain();

initObserver();
