var app = angular.module('dailyFantasy');


app.service('statService', function($http, $q){



  this.getPlayers = function(){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/allPlayers'
    }).then(function(res){
      dfd.resolve(res.data);
      console.log(res.data);
    });
    return dfd.promise;
  };

  this.getWR1 = function(){
    var dfd = $q.defer();
    var wrs = [];
    var wr1 = {};
    $http({
      method: 'GET',
      url: '/allPlayers'
    }).then(function(res){
      for(var e in res.data){
        if(res.data[e].Position === 'WR'){
          wrs.push(res.data[e])
          console.log(res.data[e].PlayerID);
        };
      }
      // for(var e in wrs){
        if(checkIfWR1(wrs[0]) === true){
          wr1.push(wrs[e].playerID);
        }
      // };
      console.log(wr1);
      dfd.resolve(res.data);
    });
    return dfd.promise;
    };

    checkIfWR1 = function(wr){
      var id = wr.PlayerID;
      console.log(id);
      console.log('break');
      return $http({
        method: 'GET',
        url: '/wr/'+id,
      }).then(function(res){
        console.log(res);
        if(res.data[e].DepthOrder === '1'){
          console.log('name: ',res.data[e].Name,'position: ', res.data[e].Position, 'Depth Order: ', res.data[e].DepthOrder);
        }
      });
    };

})
