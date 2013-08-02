function restore_options() {
	chrome.storage.sync.get(function(items) {
		for (var key in items) {
			var item = items[key];
			add_row(null, key, item);
		}
		if (items.length <= 0) {
			add_row(null, null, null);
		}
	});
}
function add_row(event, original, target) {
	var table = document.getElementById("urls").children[1];
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var cell = row.insertCell(0);
	var el = document.createElement("input");
	el.type = "text";
	el.value = typeof original !== 'undefined' ? original : "";
	cell.appendChild(el);

	cell = row.insertCell(1);
	el = document.createElement("input");
	el.type = "text";
	el.value = typeof target !== 'undefined' ? target : "";
	cell.appendChild(el);

	cell = row.insertCell(2);
	el = document.createElement("button");
	el.addEventListener('click', del_row);
	el.innerHTML = "Remove";
	el.id = "row" + rowCount;
	cell.appendChild(el);
}
function del_row(event) {
	var row = event.target.parentNode.parentNode;
	chrome.storage.sync.remove(row.children[0].children[0].value);
	row.parentNode.removeChild(row);
}
function save_options() {
	var rows = document.getElementById("urls").children[1].children;
	var store = {};
	for (var i = rows.length - 1; i >= 0; i--) {
		var row = rows[i].children;
		store[row[0].firstChild.value] = row[1].firstChild.value;
	}
	chrome.storage.sync.get(function(items) {
		for (var key in items) {
			if (!store.hasOwnProperty(key)) {
				chrome.storage.sync.remove(key);
			}
		}
	});
	chrome.storage.sync.set(store);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#add_url').addEventListener('click', add_row);
