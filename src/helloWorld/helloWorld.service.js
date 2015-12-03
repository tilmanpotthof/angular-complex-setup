angular.module('helloWorld').factory('helloWorldService', function () {
  'use strict';

  var helloWorldService: HelloWorldService = {
    helloWorld: function (name) {
      name = name || 'World';
      return 'Hello ' + name + '!';
    }
  };

  helloWorldService.helloWorld('test');

  return helloWorldService;
});
