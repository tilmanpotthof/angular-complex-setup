module.exports = (function() {
  'use strict';

  var config = require('./config/config.js');
  var _ = require('underscore');

  function getTestsourcePaths (module, circularityCheck) {
    circularityCheck = circularityCheck || [];
    var dependencies = module.dependencies;
    var sourcePaths = module.src.concat(module.templates.dest);

    circularityCheck.push(module.moduleName);
    dependencies.forEach(function (dependency) {
      if (!_.contains(circularityCheck, dependency)) {
        sourcePaths = sourcePaths.concat(getTestsourcePaths(config.modules[dependency], circularityCheck));
      }
    });

    return sourcePaths;
  }

  function getModuleTestfiles(module) {
    return config.npmComponents
      .concat(config.npmDevComponents)
      .concat(module.src)
      .concat(module.templates.dest)
      .concat(getTestsourcePaths(module))
      .concat(module.spec);
  }

  function getModuleMinTestfiles(module) {
    return config.npmComponents
      .concat(config.npmDevComponents)
      .concat(module.minDest)
      .concat(module.spec);
  }

  var karmaTasks = {
    all: {
      options: {
        configFile: 'karma.conf.js',
        coverageReporter: {
          reporters: [
            {type: 'text', dir: 'generated/reports/coverage'},
            {type: 'lcov', dir: 'generated/reports/covlerage/lcov/all'}
          ]
        },
        files: config.npmComponents
          .concat(config.npmDevComponents)
          .concat(config.all)
          .concat(config.allSpec)
      }
    }
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
