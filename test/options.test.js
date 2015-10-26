describe('options page', function() {
    this.timeout(5000);

    var PATH = 'options.html';

    var attachGet = function(value) {
        return function() {
            page.evaluate(function(value) {
                chrome.storage.sync.get = function(cb) {
                    cb(value);
                };
            },value);
        };

    };

    it('should show empty input and help on first load', function(done) {
        beforeLoadFunction = attachGet({});

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
        beforeLoadFunction = attachGet({
            'fromdomain.com': 'todomain.com'
        });

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

                sinon.assert.calledOnce(chrome.storage.sync.set);
                sinon.assert.calledWith(
                    chrome.storage.sync.set,
                    {'fromdomain.com': 'todomain.com'}
                );
            });

            done();
        });
    });
});
