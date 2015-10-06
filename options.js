(function() {
    var hide_timeout;

    function hide_message() {
        clearTimeout(hide_timeout);
        var top = document.getElementById("title");
        top.style["margin-top"] = 0;
        var message = document.getElementById("message");
        message.innerHTML = "";
        message.style.top = "-160px";
        message.className = "";
    }

    function show_message(type, header, text, time) {
        hide_message();
        var top = document.getElementById("title");
        top.style["margin-top"] = "107px";
        var message = document.getElementById("message");
        var h = document.createElement("h3");
        h.innerHTML = header;
        message.appendChild(h);
        var t = document.createElement("p");
        t.innerHTML = text;
        message.appendChild(t);
        message.className = type;
        message.style.top = "0";
        hide_timeout = setTimeout(function() { hide_message(); }, time * 1000);
    }


    function restore_options() {
        chrome.storage.sync.get(function(items) {
            var len = 0;
            for (var key in items) {
                len++;
                var item = items[key];
                add_row(null, key, item);
            }
            if (len === 0) {
                add_row(null, null, null);
                show_message("info", "No rewrite rules added", "In order to use this extension you must add at least one rewrite rule.", 15);
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
        show_message("success", "Successfully removed", "The removed rewrite rule have been successfully removed.", 5);
    }

    function del_key(key) {
        var rows = document.getElementById("urls").children[1].children;
        for (var i = rows.length - 1; i >= 0; i--) {
            if (key === rows[i].firstChild.firstChild.value)
                rows[i].parentNode.removeChild(rows[i]);
        }
    }

    function row_for_key(key) {
        var rows = document.getElementById("urls").children[1].children, val;
        for (var i = rows.length - 1; i >= 0; i--) {
            var row = rows[i].children;
            if (key === row[0].firstChild.value)
                return row[0].firstChild.value;
        }
        return val;
    }

    function update_value(key, newValue) {
        var rows = document.getElementById("urls").children[1].children;
        for (var i = rows.length - 1; i >= 0; i--) {
            if (key == rows[i].firstChild.firstChild.value)
                rows[i].children[1].firstChild.value = newValue;
        }
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
        show_message("success", "Successfully saved", "The entered rewrite rules are successfully saved.", 5);
    }

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (namespace === "local") // Local namespace is not used.
            return;
        for (var key in changes) {
            var storageChange = changes[key];

            if (storageChange.oldValue === undefined && row_for_key(key) === undefined) // New rule
                add_row(null, key, storageChange.newValue);

            if (storageChange.newValue === undefined) // Rule removed
                del_key(key);

            update_value(key, storageChange.newValue);
        }
    });

    document.addEventListener('DOMContentLoaded', restore_options);
    document.querySelector('#save').addEventListener('click', save_options);
    document.querySelector('#add_url').addEventListener('click', add_row);
    document.querySelector('#message').addEventListener('click', hide_message);
})();
