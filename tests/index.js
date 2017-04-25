// require all tests
const testsContext = require.context('../tests/', true, /.+\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all target code
const componentsContext = require.context('../client/', true, /index\.js$/);
componentsContext.keys().forEach(componentsContext);
