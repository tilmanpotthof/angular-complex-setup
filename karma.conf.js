module.exports = function(config) {
  'use strict';

  config.set({
    timeout: 1000000,
    basePath: '',
    frameworks: ['jasmine'],
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
      'karma-coverage',
      'karma-babel-preprocessor'
    ],
    babelPreprocessor: {
      options: {
        plugins: ['transform-flow-strip-types'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    }
  });
};
