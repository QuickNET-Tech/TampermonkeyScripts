
// ==UserScript==
// @name         EnforceLatestVideosYT
// @description  Clicks the "Latest" button when visiting a YouTuber's "Videos" tab on their channel
// @match        *://www.youtube.com/*
// @namespace    https://github.com/QuickNET-Tech/
// @version      1.0.1
// @grant        GM_info
// ==/UserScript==

'use strict';

function logConsole(...args) {
    const scriptName = GM_info.script.name;
    const timestr = new Date().toISOString();
    const message = args.map(arg => typeof arg === 'object'
        ? JSON.stringify(arg)
        : String(arg))
        .join(' ');
    
    console.log(`[${scriptName}][${timestr}] ${message}`);
}

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

async function documentQuerySelectorWait(waitMillis, querySelectorArg) {
    let element = null;
    const startTime = new Date().getMilliseconds();

    while (element == null && new Date().getMilliseconds() - startTime < waitMillis) {
        const result = document.querySelector(querySelectorArg);

        if (result) {
            element = result;
        } else {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    if (element == null && new Date().getMilliseconds() - startTime > waitMillis) {
        logConsole(`timed out querying for ${querySelectorArg} after ${waitMillis}ms`);
    }

    return element;
}

function clickLatestChip(chipElement) {
    chipElement.dispatchEvent(new Event('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
    logConsole("Sent click event for the Latest chip element");
}

async function scriptmain() {
    let forYouChipElementChild = await documentQuerySelectorWait(3000, '[title="For you"]');
    if (forYouChipElementChild == null) {
        logConsole("For you chip not found, no change made to sort");
        return;
    }

    let latestChipElementChild = await documentQuerySelectorWait(3000, '[title="Latest"]');
    if(latestChipElementChild) {
        clickLatestChip(latestChipElementChild.parentElement);
    }
}

scriptmain();

initObserver();
