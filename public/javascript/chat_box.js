var app = angular.module('tasks', []);
app.controller('task-controller', function($scope) {
  $scope.firstName= "John";
  $scope.lastName= "Doe";
});