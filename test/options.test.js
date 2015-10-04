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

        page.open(PATH, function(r) {
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

        page.open(PATH, function(r) {
            // Empty input loaded
            page.evaluate(function() {
                assert.equal(
                    document.querySelector('input').value,
                    ''
                );
            });

            done();
        });

    });
});
