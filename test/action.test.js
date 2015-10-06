describe('action popup', function() {
    this.timeout(5000);

    var PATH = 'action.html';

    it('should show current domain as source', function(done) {
        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.tabs.getSelected = function(cb) {
                    cb({
                        url: 'http://somedomain.com/test.html'
                    });
                };
                chrome.storage.sync.get = function(cb) {
                    cb({});
                };
            });
        };

        page.open(PATH, function() {
            page.evaluate(function() {
                assert.equal(
                    document.querySelector('#from').value,
                    'somedomain.com'
                );

                assert.equal(
                    document.querySelector('#from').disabled,
                    true
                );

                assert.equal(
                    document.querySelector('#to').value,
                    ''
                );
            });
            done();
        });
    });

    it('should save to store', function(done) {
        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.tabs.getSelected = function(cb) {
                    cb({
                        url: 'http://somedomain.com/test.html'
                    });
                };
                chrome.storage.sync.get = function(cb) {
                    cb({});
                };
            });
        };

        page.open(PATH, function() {
            page.evaluate(function() {
                // Disable redirect
                chrome.tabs.getSelected = function() {};

                document.getElementById('to').value = 'otherdomain.com';
                document.getElementById('save').click();
                sinon.assert.calledOnce(chrome.storage.sync.set);
                sinon.assert.calledWith(
                    chrome.storage.sync.set,
                    {'somedomain.com': 'otherdomain.com'}
                );
            });

            done();
        });
    });

    it('should load from store', function(done) {
        // TODO
        page.open(PATH, function() {
            page.evaluate(function() {
            });

            done();
        });
    });
});
