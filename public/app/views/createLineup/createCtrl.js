var app = angular.module('dailyFantasy');

app.controller('createCtrl', function($scope, $uibModal, $log, statService){

  $scope.players = function(){
    statService.getPlayers().then(function(res){
      console.log(res);
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


  var items = ['item1', 'item2', 'item3'];
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});
