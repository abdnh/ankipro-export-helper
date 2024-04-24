chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        let rule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: ".ankipro.net" },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowAction()],
        };
        let rules = [rule];
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
            const tokenCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("AnkiProToken"));
            let token;
            if (tokenCookie) {
                token = tokenCookie.split("=")[1];
            }
            if (token) {
                await navigator.clipboard.writeText(token);
                alert(
                    "Copied login token. Paste it in the Copycat Importer add-on."
                );
            } else {
                alert("Log in to AnkiPro first!");
            }
        },
    });
});
