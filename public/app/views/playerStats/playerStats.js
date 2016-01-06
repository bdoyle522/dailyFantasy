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

  $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },

        loading: false
    }

});
