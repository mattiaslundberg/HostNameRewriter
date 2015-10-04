phantom.injectJs('../node_modules/mocha/mocha.js');
phantom.injectJs('../node_modules/sinon-chrome/src/phantom-tweaks.js');

mocha.setup({ui: 'bdd', reporter: 'spec'});

phantom.injectJs('setUp.js');

phantom.injectJs('options.test.js');

mocha.run(function(failures) {
    setTimeout(function() {phantom.exit(failures);}, 0);
});
