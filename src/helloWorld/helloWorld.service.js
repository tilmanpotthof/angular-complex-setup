angular.module('helloWorld').factory('helloWorldService', function () {
  'use strict';

  var helloWorldService = {
    helloWorld: function (name) {
      name = name || 'World';
      return 'Hello ' + name + '!';
    }
  };

  return helloWorldService;
});
