// ==UserScript==
// @name         Zoom Web Meeting Auto Joiner
// @namespace    https://zoom.us/
// @version      1.0
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
// @downloadURL  https://github.com/patricktobias86/userscripts/tree/master/ZoomWebMeetingAutoJoiner.js
// @updateURL    https://github.com/patricktobias86/userscripts/tree/master/ZoomWebMeetingAutoJoiner.js
// ==/UserScript==

(function() {
    'use strict';

    const DEFAULT_NAME = "AUTOBOT"; // Set your default name here
    const DEFAULT_PASSWORD = "333"; // Set your default password here

    function setDefaultName() {
        const nameInput = document.querySelector("input#inputname");
        if (nameInput && !nameInput.value) {
            nameInput.value = DEFAULT_NAME;
            console.log("Default name set to:", DEFAULT_NAME);
        }
    }

    function setDefaultPassword() {
        const passwordInput = document.querySelector("input#password");
        if (passwordInput && !passwordInput.value) {
            passwordInput.value = DEFAULT_PASSWORD;
            console.log("Default password set to:", DEFAULT_PASSWORD);
        }
    }

    function acceptDisclaimer() {
        const disclaimerButton = document.querySelector("button[data-qa='joinDisclaimerAccept']");
        if (disclaimerButton) {
            disclaimerButton.click();
            console.log("Disclaimer accepted automatically.");
        }
    }

    function redirectToWeb() {
        const url = new URL(window.location.href);
        if (!url.pathname.includes("/wc/")) {
            const meetingID = url.pathname.split("/j/")[1];
            const newURL = `https://zoom.us/wc/join/${meetingID}`;
            window.location.href = newURL;
            console.log("Redirected to Zoom web client URL:", newURL);
        }
    }

    // Run the functions when the document is loaded
    window.addEventListener("load", () => {
        redirectToWeb();
        setDefaultName();
        setDefaultPassword();
        acceptDisclaimer();
    });

    // Observe for dynamic elements if the page is using JavaScript to load them after initial load
    const observer = new MutationObserver(() => {
        setDefaultName();
        setDefaultPassword();
        acceptDisclaimer();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();