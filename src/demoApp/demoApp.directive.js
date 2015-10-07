angular.module('demoApp').directive('demoApp', function (helloWorldService) {
  'use strict';

  return {
    restrict: 'E',
    templateUrl: 'demoApp/demoApp.html',
    link: function (scope) {
      scope.helloWorld = helloWorldService.helloWorld;
    }
  };
});
