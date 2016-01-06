var app = angular.module('dailyFantasy');

app.controller('frontCtrl', function($scope, $state, $http, userService){

  $scope.addUser = function(){
    $http({
      method: 'POST',
      url: '/signup',
      data:{
        username: $scope.user.username,
        password: $scope.user.password
      }
    }).success(function(res, err){
      $state.go('createLineup');
    })
  };

  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/login',
      data: {
        username: $scope.login.username,
        password: $scope.login.password
      }
    }).success(function(res, err){
      $state.go('createLineup');
    })
  };
});
