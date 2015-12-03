module.exports = (function () {
  'use strict';

  var jsModulePaths = require('./config/config.js');
  var _ = require('underscore');

  var babel = {
    options: {
      plugins: ['transform-flow-strip-types']
    }
  };

  _.each(jsModulePaths.modules, function (modulePaths, moduleName) {
    babel[moduleName] = {
      files: {}
    };

    babel[moduleName].files[modulePaths.dest] = modulePaths.dest;
  });

  return babel;
}());
