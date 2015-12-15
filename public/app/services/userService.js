var app = angular.module('dailyFantasy');

app.service('userService', function($http){

  this.createUser = function(user){
    return $http({
      method: 'POST',
      url: '/api/user/',
      data: {
        username: user.username,
        password: user.password
      }
    });
  };

  this.createLineup = function(lineup){
    console.log(lineup.player1);
    return $http({
      method: 'POST',
      url: '/api/lineup',
      data: {
        players: lineup
      }
    })
  }

});
