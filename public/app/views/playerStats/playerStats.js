var app = angular.module('dailyFantasy');


app.controller('playerStatsCtrl', function($scope, statService){

  $scope.stats = function(){
    statService.getWrSeasonStats().then(function(res){
      console.log(res);
      $scope.players = res;
      $scope.labels = statService.getLabels(res);
      $scope.data = statService.getData(res);
      $scope.series = ['Projected', 'Actual'];
    });
  };

  $scope.stats();

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

});
