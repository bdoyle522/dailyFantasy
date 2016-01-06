var app = angular.module('dailyFantasy');


app.service('statService', function($http, $q){

  var wr1 = [{"ARI": "5571"}, {"ATL": "13291"}, {"BAL": "12722"}, {"BUF": "16003"}, {"CAR": "12109"}, {"CHI": "14187"}, {"CIN": "12845"}, {"CLE": "13887"}, {"DAL": "11270"}, {"DEN": "11197"}, {"DET": "6029"}, {"GB": "13227"}, {"HOU": "14986"}, {"IND": "14005"}, {"JAX": "15018"}, {"KC": "8914"}, {"MIA": "16020"}, {"MIN": "16906"}, {"NE": "9906"}, {"NO": "16568"}, {"NYG": "16389"}, {"NYJ": "11667"}, {"OAK": "16765"}, {"PHI": "15974"}, {"PIT": "11056"}, {"SD": "2950"}, {"SF": "11712"}, {"STL": "15215"}, {"TB": "16597"}, {"TEN": "16801"}, {"WAS": "3943"}];

  this.getPlayers = function(){
    var wrs = [];
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/allPlayers'
    }).then(function(res){
      for (var e in res.data){
        if((res.data[e].Position === 'WR')&&(res.data[e].StatusCode === 'ACT')&&(res.data[e].Salary>2999)){
          wrs.push(res.data[e]);
        }
      }
      dfd.resolve(wrs);
    });
    return dfd.promise;
  };

  this.getResults = function(){
    $http({
      method: 'GET',
      url: '/results'
    })
  };

  this.getWR1 = function(){
    return wr1;
  };

  // this.getWrProjection = function(){
  //   var dfd = $q.defer();
  //   var season = [];
  //   for(var week = 1; week < 11; week++){
  //     $http({
  //       method: 'GET',
  //       url: '/projections/'+week,
  //     }).then(function(res){
  //       season.push(res.data.FantasyPointsFanDuel);
  //       console.log(season);
  //       dfd.resolve(season);
  //     });
  //   };
  //   return dfd.promise;
  // };

  this.getWrSeasonStats = function(week){
    var dfd = $q.defer();
    var season = [];
    for(var week = 1; week < 11; week++){
      $http({
        method: 'GET',
        url: '../week'+week+'.json',
      }).then(function(res){
        season.push(res.data);
        for(var i = 0; i < season.length; i++){
          season[i].Difference = (season[i].FantasyPointsFanDuel - season[i].Projection).toFixed(2);
        }
        dfd.resolve(season);
      });
    };
    return dfd.promise;
  };



  // this.getWR1 = function(){
  //   var dfd = $q.defer();
  //   var wrs = [];
  //   var wr1 = {};
  //   $http({
  //     method: 'GET',
  //     url: '/allPlayers'
  //   }).then(function(res){
  //     for(var e in res.data){
  //       if(res.data[e].Position === 'WR'){
  //         wrs.push(res.data[e])
  //         console.log(res.data[e].PlayerID);
  //       };
  //     }
  //     for(var i = 0; i < wrs.length; i++){
  //       if(checkIfWR1(wrs[i])){
  //         wr1.push(wrs[i].playerID);
  //       }
  //     };
  //     console.log(wr1);
  //     dfd.resolve(res.data);
  //   });
  //   return dfd.promise;
  //   };
  //
  //   checkIfWR1 = function(wr){
  //     var dfd = $q.defer();
  //     var id = wr.PlayerID;
  //     $http({
  //       method: 'GET',
  //       url: '/wr/'+id,
  //     }).then(function(res){
  //       var depth = res.data.DepthOrder
  //       if(depth === 1){
  //         console.log(res.data);
  //         return true;
  //       }
  //       return false;
  //     });
  //   };

});
