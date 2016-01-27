var app = angular.module('dailyFantasy');

app.controller('savedCtrl', function($scope, savedService){

  $scope.getLineups = function(){
    $scope.lineups = savedService.getSavedLineups();
  }
  $scope.getLineups();
});
