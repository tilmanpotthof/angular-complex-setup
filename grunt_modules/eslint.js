module.exports = (function () {
  'use strict';

  var config = require('./config/config.js');
  var _ = require('underscore');
  var fs = require('fs');

  var flowFileEnding = '.flow.js';
  var flowGlobals = fs.readdirSync('./src/interfaces/').filter(function (file) {
    return file.endsWith(flowFileEnding);
  }).map(function (flowFile) {
    return flowFile.replace(flowFileEnding, '');
  });

  var eslintConfig = {
    dev: {
      src: [
        'src/**/*.js',
        '!src/**/*.flow.js'
      ],
      options: {
        configFile: '.eslint-dev.json',
        globals: flowGlobals
      }
    },

    prod: {
      src: [
        'src/**/*.js',
        '!src/**/*.flow.js'
      ],
      options: {
        configFile: '.eslint.json',
        globals: flowGlobals
      }
    }
  };

  config.eachModule(function (modulePaths, moduleName) {
    eslintConfig[moduleName] = {
      src: modulePaths.anyJs,
      options: {
        configFile: '.eslint.json',
        globals: flowGlobals
      }
    };
    eslintConfig[moduleName + 'Dev'] = {
      src: modulePaths.anyJs,
      options: {
        configFile: '.eslint-dev.json',
        globals: flowGlobals
      }
    };
  });

  return eslintConfig;
}());
