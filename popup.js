let changeURL = document.getElementById("changeURL");
let message = document.getElementById("message");

changeURL.addEventListener("click", async () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currentUrl = tabs[0].url;
        
        if (!currentUrl.startsWith("https://www.youtube.com/@")) {
            wrongPageMessage.style.display = "block";
        } else {
            wrongPageMessage.style.display = "none";
            
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: modifyMetaTagAndRedirect
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    window.close();
                }
            });
        }
    });
});

function modifyMetaTagAndRedirect() {
    let metaTag = document.querySelector('meta[property="og:url"]');
    
    if (metaTag) {
        let content = metaTag.getAttribute('content');
        let channelIdMatch = content.match(/\/channel\/(UC[\w-]+)/);
        
        if (channelIdMatch) {
            let channelId = channelIdMatch[1];
            let modifiedChannelId = "UUMO" + channelId.slice(2);
            let newUrl = "https://www.youtube.com/playlist?list=" + modifiedChannelId;
            window.location.href = newUrl;
        } else {
            console.log('Channel ID not found in the meta tag content');
        }
    } else {
        console.log('Meta tag with og:url property not found');
    }
}