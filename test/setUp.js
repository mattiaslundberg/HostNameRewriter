var fs = require('fs');
var page;
var beforeLoadFunction;

beforeEach(function() {
    page = require('webpage').create();

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };

    page.onError = function(msg, trace) {
        var msgStack = [msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }

        try {
            mocha.throwError(msgStack.join('\n'));
        } catch(e) {}
    };

    page.onInitialized = function() {
        page.injectJs('../node_modules/chai/chai.js');
        page.injectJs('../node_modules/sinon/pkg/sinon.js');
        page.injectJs('../node_modules/sinon-chrome/chrome.js');
        page.injectJs('../node_modules/sinon-chrome/src/phantom-tweaks.js');
        page.evaluate(function() {
            assert = chai.assert;

            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initMouseEvent('click', true);
        });

        if (beforeLoadFunction) {
            beforeLoadFunction();
        }
    };

});

afterEach(function() {
    page.close();
    beforeLoadFunction = null;
});
