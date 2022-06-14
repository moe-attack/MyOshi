const mainPagePrefix = "https://www.youtube.com/channel/UC"
const memberPagePrefix = "https://www.youtube.com/playlist?list=UUMO"

let changeURL = document.getElementById("changeURL");

var activeTabId;
chrome.tabs.onActivated.addListener(function(activeInfo) {
    activeTabId = activeInfo.tabId;
});

changeURL.addEventListener("click", async () => {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        if (url.startsWith(mainPagePrefix)) {

            url = url.slice(mainPagePrefix.length).split('/')[0];

            chrome.tabs.update({ url: memberPagePrefix.concat(url) });

            window.close();
        }
        else {
            alert("Only support Youtube, at your Oshi's home page.");
            window.close();
        }
    });
});