chrome.tabs.getSelected(function(tab) {
	chrome.storage.sync.get(function(items) {
		var found = false;
		for (from in items) {
			var reto = new RegExp("^http[s]?\:\/\/" + items[from] + "\/\.*$", "i");
			if (tab.url.match(reto)) {
				document.getElementById('information').innerHTML = "Current rule:";
				document.getElementById('from').value = from;
				document.getElementById('to').value = items[from];
				found = true;
				break;
			}
		}
		if (!found) {
			document.getElementById('information').innerHTML = "Add rule:";
			document.getElementById('from').value = tab.url;
		}
	});
});

function save_options() {
	var from = document.getElementById('from').value;
	var to = document.getElementById('to').value;
	var store = {from: to};
	chrome.storage.sync.set(store);
}

document.querySelector('#save').addEventListener('click', save_options);
