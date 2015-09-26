module.exports = (function() {
  'use strict';

  var config = require('./config/config.js');
  var _ = require('underscore');

  function getTestsourcePaths (module, circularityCheck) {
    var sourcePaths = module.getSourcesWithDependencies()
    return sourcePaths;
  }

  function getModuleTestfiles(module) {
    return config.npmComponents
      .concat(config.npmDevComponents)
      .concat(module.getSourcesWithDependencies())
      .concat(module.spec);
  }

  function getModuleMinTestfiles(module) {
    return config.npmComponents
      .concat(config.npmDevComponents)
      .concat(module.minDest)
      .concat(module.spec);
  }

  var karmaTasks = {
  };

  _.each(config.modules, function (modulePaths, moduleName) {
    karmaTasks[moduleName] = {
      options: {
        configFile: 'karma.conf.js',
        coverageReporter: {
          reporters: [
            {type: 'text', dir: 'generated/reports/coverage'},
            {type: 'lcov', dir: 'generated/reports/coverage/lcov/' + moduleName}
          ]
        },
        files: getModuleTestfiles(modulePaths)
      }
    };

    karmaTasks[moduleName + 'Min'] = {
      options: {
        configFile: 'karma.conf.js',
        coverageReporter: {
          reporters: []
        },
        files: getModuleMinTestfiles(modulePaths)
      }
    };
  });

  return karmaTasks;
})();
