var app = angular.module('dailyFantasy');

app.controller('frontCtrl', function($scope, userService){

  $scope.addUser = function(user){
    userService.createUser(user).then(function(res){
      console.log(res);
    });
  };
});
