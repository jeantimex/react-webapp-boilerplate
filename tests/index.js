// require all tests
const testsContext = require.context('../tests/', true, /.+\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all target code
const componentsContext = require.context('../client/', true, /index\.js$/);
//componentsContext.keys().forEach(componentsContext);

// PhantomJS 2.1.1 (Mac OS X 0.0.0) ERROR
// Invariant Violation: _registerComponent(...): Target container is not a DOM element.
// we are ignoring the index.js in client/
let componentsContextKeysWithoutIndexJs = componentsContext.keys().filter(
  function (filePath) { return filePath !== './index.js' }
);
componentsContextKeysWithoutIndexJs.forEach(componentsContext);
