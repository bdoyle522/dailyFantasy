angular.module('dailyFantasy').controller('previousCtrl', function($scope, prevLineService){

  $scope.lineups = {
    lineup: {
      _id: '1234',
      week: '14',
      projection: '64',
      results: '66'
    }
  }
  $scope.getLineups = function(){
    prevLineService.getPastLineups().then(function(lineups){
      $scope.lineups = lineups;
      console.log($scope.lineups);
      console.log('in previous lineup controller');
    })
  }
  $scope.getLineups();

})
