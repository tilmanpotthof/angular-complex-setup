module.exports = function(config) {
  'use strict';

  var pathConfig = require('./grunt_modules/config/config.js');

  config.set({
    timeout: 1000000,
    basePath: '',
    frameworks: ['jasmine'],
    files: pathConfig.npmComponents
      .concat(pathConfig.npmDevComponents)
      .concat([
        'src/app/**/*.module.js',
        'src/app/**/*.controller.js',
        'src/app/**/*.directive.js',
        'src/app/**/*.service.js',
        'src/app/**/*.filter.js',
        'src/app/**/*.ngLocale.js',
        'src/app/**/*.spec.config.js',
        'src/app/**/*.spec.js',
        'src/app/**/*.html'
      ]),
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    autoWatch: false,
    singleRun: true,
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],
    preprocessors: {
      'src/**/!(*spec).js': 'coverage'
    },
    coverageReporter: {
      reporters: [
        {type: 'text', dir: 'generated/reports/coverage'},
        {type: 'html', dir: 'generated/reports/coverage/html'},
        {type: 'lcov', dir: 'generated/reports/coverage/lcov'}
      ]
    }
  });
};
