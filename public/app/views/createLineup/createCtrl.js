var app = angular.module('dailyFantasy');

app.controller('createCtrl', function($scope, statService){

  $scope.players = function(){
    statService.getPlayers().then(function(res){
      $scope.athletes = res;
      console.log($scope.group);
    });
  };
  $scope.players();
});
