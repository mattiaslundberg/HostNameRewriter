var regex = /^(http[s]?\:\/\/)([^\/]*)(\/.*)$/i;

chrome.tabs.getSelected(function(tab) {
	var fromBox = document.getElementById("from");

	chrome.storage.sync.get(function(items) {
		var found = false;
		document.querySelector("#to").onkeypress = on_key_press;
		document.querySelector("#from").onkeypress = on_key_press;
		var match = tab.url.match(regex);
		for (var from in items) {
			if (match[2] == items[from]) {
				document.getElementById("information").innerHTML = "Current rule:";
				fromBox.value = from;
				document.getElementById("to").value = items[from];
				found = true;
				break;
			}
		}
		if (!found) {
			document.getElementById("information").innerHTML = "Add rule:";
			fromBox.value = match[2];
		}
		fromBox.disabled = true;
	});
});

function on_key_press(event) {
	if (event.keyCode == 13)
		save_options();
}

function save_options() {
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;
	var store = {};
	store[from] = to;
	chrome.storage.sync.set(store);
	chrome.tabs.getSelected(function(tab) {
		var match = tab.url.match(regex);
		chrome.tabs.update(tab.id, {url: match[1] + to + match[3]});
	});
}

document.querySelector("#save").addEventListener("click", save_options);
