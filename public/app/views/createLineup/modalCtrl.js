angular.module('dailyFantasy').controller('ModalCtrl', function($scope, $uibModalInstance, statService){
  var items = ['item1', 'item2', 'item3'];
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.stats = function(){
    // var projections = {};
    var week = 1;
    $scope.week = week;
    // for(var week = 1; week < 3; week ++){
    statService.getWrProjection(week).then(function(res){
      $scope.player = res.data;
      $scope.proj = res.data.FantasyPointsPPR;
        // console.log(res.data);
        // projections.push(res.data);
    });
      // console.log(projections);
    // $scope.player = projections;
    statService.getWrSeasonStats(week).then(function(res){
      $scope.actual = res.data.FantasyPointsPPR;
      $scope.act = res.data.FantasyPointsPPR;
      console.log($scope.act);
    });
    setTimeout(function(){
      console.log($scope.act);
      $scope.difference = $scope.act-$scope.proj;
      console.log($scope.difference);
    }, 3000)

  };

  $scope.stats();
});
