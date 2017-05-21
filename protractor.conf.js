exports.config = {
  framework: 'mocha',
  mochaOpts: {
     timeout: 30000,
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/dashboard.test.js']
};
