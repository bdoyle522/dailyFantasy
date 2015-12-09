var app = angular.module('dailyFantasy');

app.controller('createCtrl', function($scope, statService){

  $scope.players = function(){
    statService.getPlayers().then(function(res){
      console.log(res[0].Name);
      $scope.athletes = res;
      // statService.getWR1();
    });
  };
  $scope.players();
  $scope.predicate = 'Salary';
  $scope.reverseSort = false;
  $scope.sort = function(predicate){
    $scope.predicate === 'Name';
  };
});
