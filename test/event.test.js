describe('event background script', function() {
    this.timeout(5000);

    var PATH = 'test/empty.html';

    it('should renavigate when loading simple domain', function(done) {
        beforeLoadFunction = function() {
            page.evaluate(function() {
                chrome.storage.sync.get = function(value, cb) {
                    cb({
                        'fromdomain.com': 'todomain.com'
                    });
                };
            });
        };

        page.open(PATH, function() {
            // inject the background script
            page.injectJs('event.js');

            page.evaluate(function() {
                assert.equal(chrome.webNavigation.onBeforeNavigate._listeners.length, 1);

                var listener = chrome.webNavigation.onBeforeNavigate._listeners[0];
                var url = 'http://fromdomain.com/';

                listener({
                    url: url,
                    tabId: 0
                });

                // TODO: asserts
            });

            done();
        });
    });
});
