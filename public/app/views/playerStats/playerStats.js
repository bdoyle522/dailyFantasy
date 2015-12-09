var app = angular.module('dailyFantasy');

app.controller('playerStatsCtrl', function($scope, statService){

  $scope.stats = function(){
    var projections = [];
    for(var week = 1; week < 3; week ++){
      statService.getWrProjection(week).then(function(res){
        console.log(res.data);
        projections.push(res.data);
      });
      console.log(projections);
    }

    $scope.player = projections;
    statService.getWrSeasonStats(week).then(function(res){
      $scope.actual = res.data.FantasyPointsPPR;
      var act = parseInt(res.data.FantasyPointsPPR);
    });
  };
  $scope.stats();
});
