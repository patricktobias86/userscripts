// ==UserScript==
// @name         Zoom Web Meeting Auto Joiner
// @namespace    https://zoom.us/
// @version      1.0.3
// @description  Automatically joins Zoom meetings on the web with default name and password, and accepts disclaimers if present.
// @author       Optimus1132
// @icon         https://i.imgur.com/y8BXA8l.png
// @inject-into  content
// @run-at       document-start
// @match        https://zoom.us/*
// @match        https://*.zoom.us/*
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL  https://raw.githubusercontent.com/patricktobias86/userscripts/refs/heads/master/ZoomWebMeetingAutoJoiner.js
// @updateURL    https://raw.githubusercontent.com/patricktobias86/userscripts/refs/heads/master/ZoomWebMeetingAutoJoiner.js
// ==/UserScript==

(function() {
    'use strict';

    const DEFAULT_NAME = "AUTOBOT"; // Set your default name here
    const DEFAULT_PASSWORD = "333"; // Set your default password here

    function setDefaultName() {
        const nameInput = document.getElementById("#input-for-name");
        if (nameInput && !nameInput.value) {
            nameInput.value = DEFAULT_NAME;
            console.log("Default name set to:", DEFAULT_NAME);
        }
    }

    function setDefaultPassword() {
        const passwordInput = document.getElementById("#input-for-password");
        if (passwordInput && !passwordInput.value) {
            passwordInput.value = DEFAULT_PASSWORD;
            console.log("Default password set to:", DEFAULT_PASSWORD);
        }
    }

    function acceptDisclaimer() {
        const disclaimerButton = document.getElementById("#disclaimer_agree");
        if (disclaimerButton) {
            disclaimerButton.click();
            console.log("Disclaimer accepted automatically.");
        }
    }

    function redirectToWeb() {
        const url = new URL(document.URL);
        const match = /^\/[js]\/(\d+)\/?$/.exec(url.pathname);
        if (match === undefined || match === null || match[1] === undefined) {
            return;
        }
        const urlEnding = match[0][1];
        const meetingId = match[1];
        const mapping = {'j': '/join', 's': '/start'};
        
        document.location.pathname = '/wc/' + encodeURIComponent(meetingId) + mapping[urlEnding];
    }

    // Run the functions when the document is loaded
    window.addEventListener("load", () => {
        redirectToWeb();
        acceptDisclaimer();
        setDefaultName();
        setDefaultPassword();
    });

    // Observe for dynamic elements if the page is using JavaScript to load them after initial load
    const observer = new MutationObserver(() => {
        acceptDisclaimer();
        setDefaultName();
        setDefaultPassword();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
