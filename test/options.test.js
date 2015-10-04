describe('options page', function() {
    this.timeout(5000);

    var FILE = 'test/empty.html';
    var PATH = 'options.html';

    it('should show empty input and help on first load', function(done) {
        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.storage.sync.get = function(cb) {
                    cb({});
                };
            });
        };

        page.open(PATH, function() {
            // Empty input loaded
            page.evaluate(function() {
                assert.equal(
                    document.querySelector('input').value,
                    ''
                );
            });

            // Top bar shown
            page.evaluate(function() {
                assert.equal(
                    document.querySelector('#message h3').innerText,
                    'No rewrite rules added'
                );
            });

            done();
        });
    });

    it('should load saved rewrites', function(done) {
        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.storage.sync.get = function(cb) {
                    cb({
                        'fromdomain.com': 'todomain.com'
                    });
                };
            });
        };

        page.open(PATH, function() {
            page.evaluate(function() {
                var rows = document.getElementById("urls").children[1].children;
                assert.equal(rows.length, 1);

                var row = rows[0];

                assert.equal(
                    row.children[0].firstChild.value,
                    'fromdomain.com'
                );

                assert.equal(
                    row.children[1].firstChild.value,
                    'todomain.com'
                );
            });

            done();
        });
    });

    it('should save to storage', function() {
        page.open(PATH, function() {
            page.evaluate(function() {
                var rows = document.getElementById("urls").children[1].children;
                assert.equal(rows.length, 1);

                var row = rows[0];

                row.children[0].firstChild.value = 'fromdomain.com';
                row.children[1].firstChild.value = 'todomain.com';

                document.querySelector('#add_url').click();

                assert.calledOnce(chrome.storage.sync.set);
                assert.calledOnceWithMatch(
                    chrome.storage.sync.set,
                    {'fromdomain.com': 'todomain.com'}
                );
            });

            done();
        });
    });
});
