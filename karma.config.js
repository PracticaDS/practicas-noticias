module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
       { pattern: 'test/*.js' }
    ],
    exclude: [
    ],
    preprocessors: {
      'test/main.js': ['webpack']
    },
    reporters: [ "mocha" ],
    mochaReporter: {
			output: "full"
		},
    webpack: require('./webpack.config'),
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    port: 9876,
    browsers: ['Chrome'],
    singleRun: true,
  })
}
