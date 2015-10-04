describe('options page', function() {
    this.timeout(5000);

    var FILE = 'test/empty.html';
    var PATH = 'options.html';

    it('should not show anything on first load', function(done) {
        var chrome = require('sinon-chrome');

        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.storage.sync.get = function(cb) {
                    cb([]);
                };
            });
        };

        page.open(PATH, function(r) {
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
