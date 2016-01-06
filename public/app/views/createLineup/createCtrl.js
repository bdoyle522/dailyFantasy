var app = angular.module('dailyFantasy');

app.controller('createCtrl', function($scope, $uibModal, $log, $state, statService, userService){

  $scope.players = function(){
    statService.getPlayers().then(function(res){
      // console.log(res);
      $scope.athletes = res;
    });
    $scope.select1 = {};
    $scope.select2 = {};
    $scope.select3 = {};
    $scope.totalSalary = 0;
    statService.getResults();
  };
  $scope.players();
  $scope.predicate = 'Salary';
  $scope.reverseSort = false;
  $scope.sort = function(predicate){
    $scope.predicate === 'Name';
  };

  $scope.selectPlayer = function(athlete){
    if($scope.select1 === athlete || $scope.select2 === athlete || $scope.select3 === athlete){
      alert('You have already selected '+ athlete.Name);
    }
    else if(!$scope.select1.ShortName){
      $scope.select1 = athlete;
      $scope.totalSalary+= athlete.Salary;
      $scope.first = true;
    }
    else if (!$scope.select2.ShortName){
      $scope.select2 = athlete;
      $scope.totalSalary+= athlete.Salary;
      $scope.second = true;
    }
    else if (!$scope.select3.ShortName){
      $scope.select3 = athlete;
      $scope.totalSalary+= athlete.Salary;
      $scope.third = true;
    }
    else{alert('You have already selected 3 receivers')};
  };
  $scope.submitLineup = function(){
    var lineup = {
      player1: $scope.select1,
      player2: $scope.select2,
      player3: $scope.select3
    };
    userService.createLineup(lineup);
    //TODO make this a promise instead of automatically going to myLineups without
    $state.go('myLineups');
  }

  $scope.removePlayer = function(athlete){
    switch(athlete){
      case 1:
        $scope.totalSalary -= $scope.select1.Salary
        $scope.select1 = {}
        $scope.sortThem()
        break;
      case 2:
        $scope.totalSalary -= $scope.select2.Salary
        $scope.select2 = {}
        $scope.sortThem()
        break;
      case 3:
        $scope.totalSalary -= $scope.select3.Salary
        $scope.select3 = {}
        $scope.sortThem()
        break;
    }
  };



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
