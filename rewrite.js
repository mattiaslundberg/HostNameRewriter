function rewriter() {
	chrome.storage.sync.get(function(items) {
		for (from in items) {
			var to = items[from];
			var regex = new RegExp("^" + from + "$", "i");
			if (window.location.host.match(regex)) {
				window.location.host = to;
			}
		}
	});
}
rewriter();
