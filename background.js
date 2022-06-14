// const mainPagePrefix = "https://www.youtube.com/channel/UC"
// const memberPagePrefix = "https://www.youtube.com/playlist?list=UUMO"

// function updateURL() {
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//         let url = tabs[0].url;
//         // use `url` here inside the callback because it's asynchronous!
//         url.replace(/^(mainPagePrefix)/,memberPagePrefix)
//         chrome.tabs.update({ url: url })
//     });
// }

