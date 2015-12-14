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
    statService.getWrSeasonStats().then(function(res){
      $scope.players = res;
      $scope.players.difference = $scope.players.FantasyPointsFanDuel-$scope.players.Projection;
    });
  };
  setTimeout(function(){
    for(var i = 0; i < 11; i++){
      $scope.difference = $scope.players.FantasyPointsFanDuel-$scope.players.Projection;
  }}, 2000);
  $scope.stats();
});
