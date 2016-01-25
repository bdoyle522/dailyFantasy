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
    console.log(lineup);
    var totalProjected = lineup.player1.ProjectedFantasyPoints + lineup.player2.ProjectedFantasyPoints + lineup.player3.ProjectedFantasyPoints;
    return $http({
      method: 'POST',
      url: '/lineup',
      data: {
        players: lineup,
        projected: totalProjected
      }
    })
  };

});
