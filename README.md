# Host Name Rewriter

[![Build Status](https://api.travis-ci.org/mattiaslundberg/HostNameRewriter.png?branch=master)](https://travis-ci.org/mattiaslundberg/HostNameRewriter)

Chrome extension for changing of host names when visiting a site. Available at [chrome web store](https://chrome.google.com/webstore/detail/host-name-rewriter/kgkjmljnaneinhnbbdhigejjffonhffb)

Example: Attempting to reach 'example.com/something' will always be redirected to 'mydomain.com/something'.

## Development

 - Make sure you have installed [nodejs](https://nodejs.org/en/)
 - Run `npm install` to install all local dependencies

### Automated tests

 - Run `npm run test` to run automated tests 
 
### Manual tests

 - To test locally open Chrome and navigate to [chrome://extensions](chrome://extensions)
 - Check the box "Developer mode" near the top of the page
 - Click "Load unpacked extension" and locate the project root
 - Open extension options to configure and get started with testing

## Release new version

 - Update version in `manifest.json` and `package.json`
 - Commit the change
 - Tag the commit `git commit -a vX.Y.Z -m "vX.Y.Z"`
 - Push the change `git push --tags`
 - Create a zip-file with the new release: `zip -r release.zip images/ Gruntfile.js action.js event.js options.js manifest.json package-lock.json package.json action.html options.html css`
 - Upload `release.zip` to the developer dashboard
