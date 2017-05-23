const webDriverHost = process.env.WEBDRIVER_HOST || 'localhost'

exports.config = {
  framework: 'mocha',
  mochaOpts: {
     timeout: 30000,
  },
  seleniumAddress: `http://${webDriverHost}:4444/wd/hub`,
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/dashboard.test.js']
};
