var app = angular.module('dailyFantasy');


app.controller('playerStatsCtrl', function($scope, statService){

  $scope.stats = function(){
    statService.getWrSeasonStats().then(function(res){
      console.log(res);
      $scope.players = res;
      $scope.players.difference = $scope.players.FantasyPointsFanDuel-$scope.players.Projection;
    });
  };

  $scope.stats();
  
});
