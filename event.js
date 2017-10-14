(function() {
    var regex = /^(http[s]?\:\/\/)([^\/]*)(\/.*)$/i;

    function renavigate(event) {
        var match = event.url.match(regex);
        if (match === undefined || match === null || match.length != 4) {
            return;
        }

        chrome.storage.sync.get(match[2], function(item) {
            if (item.hasOwnProperty(match[2])) {
                chrome.tabs.get(event.tabId, function(tab) {
                    if (tab.url == event.url) {
                        chrome.tabs.update(event.tabId, {url: match[1] + item[match[2]] + match[3]});
                    }
                });
            }
        });
    }

    chrome.webNavigation.onBeforeNavigate.addListener(renavigate);
    chrome.webNavigation.onCommitted.addListener(renavigate);

    chrome.browserAction.onClicked.addListener(function(tab) {
        if (!tab.url.match(/^http[s]?\:\/\//)) {
            return;
        }
        chrome.browserAction.setPopup({popup: "action.html"});
    });
})();
