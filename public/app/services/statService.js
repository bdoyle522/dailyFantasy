var app = angular.module('dailyFantasy');


app.service('statService', function($http, $q){

  var players = [
    {name: 'Martavis Bryant', salary: 5600},
    {name: 'Kamar Aiken', salary: 5200},
    {name: 'ODell Beckham Jr', salary: 9200}
  ];

  this.getPlayers = function(){
    return players;
  };



})
