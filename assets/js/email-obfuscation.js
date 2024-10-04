(function () {
    "use strict";

    // SEE: email-obfuscator.js (https://gist.github.com/brycekwon/0109e44f85bc5532a4255988cb01ece0)
    function decodeEmail(encoded) {
        let key = parseInt(encoded.slice(0, 2), 16);
        let email = "";

        for (let i = 2, len = encoded.length; i < len; i += 2) {
            email += String.fromCharCode(parseInt(encoded.slice(i, i + 2), 16) ^ key);
        }
        try {
            return decodeURIComponent(email);
        } catch (e) {
            console.error(e);
            return "";
        }
    }

    function processObfuscatedEmails() {
        document.querySelectorAll("[obfuscated-email]").forEach(function (element) {
            let encodedEmail = element.getAttribute("obfuscated-email");
            if (encodedEmail) {
                let decodedEmail = decodeEmail(encodedEmail);
                if (decodedEmail) {
                    element.setAttribute("href", "mailto:" + decodedEmail);
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", processObfuscatedEmails);
})();
