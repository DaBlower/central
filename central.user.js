// ==UserScript==
// @name         Sentral customiser
// @namespace    https://github.com/DaBlower
// @version      0.9
// @description  Changes the theme of the Sentral dashboard
// @author       obob
// @match        https://*.sentral.com.au/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const defaults = {
        headerColour: "#3498db", // #ff8c0f was og
        backgroundColour: "#2c3e50",
        tileColour: "#e74c3c",
        accentColour: "#e74c3c"
    }

    let theme = GM_getValue("userTheme", defaults)

    theme.sidebarBorder = calculateBorder(theme.tileColour)

    const style = document.createElement('style');
    style.id = "custom-obob";
    style.innerHTML = `
        .header { 
            background-color: ${theme.headerColour} !important;
        }
        
        /* background (very back) */
        body {
            background: ${theme.backgroundColour} !important;
        }


        /* background (the tiles like attendance and stuff) */
        .dash_collection {
            background: ${theme.tileColour} !important;
            border: 1px solid ${theme.sidebarBorder} !important;
        }
    `

    document.head.appendChild(style);

    function calculateBorder(hex) {
        hex = hex.replace('#', '');

        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        r = Math.max(0, r - 31).toString(16).padStart(2, '0');
        g = Math.max(0, g - 31).toString(16).padStart(2, '0');
        b = Math.max(0, b - 31).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }

})();