chrome.tabs.getSelected(function(tab) {
	var fromBox = document.getElementById("from");
	
	chrome.storage.sync.get(function(items) {
		var found = false;
		for (from in items) {
			var reto = new RegExp("^http[s]?\:\/\/" + items[from] + "\/\.*$", "i");
			if (tab.url.match(reto)) {
				document.getElementById("information").innerHTML = "Current rule:";
				fromBox.value = from;
				document.getElementById("to").value = items[from];
				found = true;
				break;
			}
		}
		if (!found) {
			document.getElementById("information").innerHTML = "Add rule:";
			fromBox.value = tab.url.match(new RegExp("^http[s]?\:\/\/([^\/]*)\/\.*$", "i"))[1];
		}
		fromBox.disabled = true;
	});
});

function save_options() {
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;
	var store = {};
	store[from] = to;
	chrome.storage.sync.set(store);
	chrome.tabs.getSelected(function(tab) {
		var protore = new RegExp("^(http[s]?\:\/\/)\.*$", "i");
		var urire = new RegExp("^http[s]?\:\/\/[^\/]*(\/.*)$", "i");
		var url = tab.url.match(protore)[1] + to + tab.url.match(urire)[1];
		// chrome.browserAction.setPopup({popup: ""});
		window.close();
		chrome.tabs.update(tab.id, {url: url});
	});
}

document.querySelector("#save").addEventListener("click", save_options);
