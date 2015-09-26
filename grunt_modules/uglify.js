module.exports = function() {
  'use strict';

  var _ = require('underscore');
  var config = require('./config/config.js');

  var uglify = {
  };

  var distJsPath = 'generated/dist/js/';

  config.mapModulesWithTemplate('<%= moduleName %>').forEach(function (moduleName) {
    var minPath = distJsPath + moduleName + '.min.js';
    var path = distJsPath + moduleName + '.js';

    uglify[moduleName] = {
      files: {}
    };
    uglify[moduleName].files[minPath] = [path];
  });

  return uglify;
};
