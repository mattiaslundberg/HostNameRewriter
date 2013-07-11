chrome.webNavigation.onBeforeNavigate.addListener(function(event) {
	chrome.storage.sync.get(function(items) {
		for (from in items) {
			var runOn = new RegExp("^http[s]?\:\/\/" + from + "\/\.*$", "i");
			if (event.url.match(runOn)) {
				chrome.tabs.get(event.tabId, function(tab) {
					if (tab.url == event.url) { // Only update if main
						var protore = new RegExp("^(http[s]?\:\/\/)\.*$", "i");
						var urire = new RegExp("^http[s]?\:\/\/[^\/]*(\/.*)$", "i");
						var url = event.url.match(protore)[1] + items[from] + event.url.match(urire)[1];
						chrome.tabs.update(event.tabId, {url: url});
					}
				});
				break;
			}
		}
	});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	var runOn = new RegExp("^(http[s]?\:\/\/)\.*$", "i");
	if (tab.url.match(runOn)) {
		// Create and display the action
	} else {
		// PASS
	}
});
