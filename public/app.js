var app = angular.module('dailyFantasy', ['ui.router', 'ngAnimate','ui.bootstrap', 'chart.js']);


app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('frontPage', {
      url: '/login',
      templateUrl: 'app/views/frontPage/frontTmpl.html',
      controller: 'frontCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/views/home/homeTmpl.html',
      controller: 'homeCtrl'
    })
    .state('previousLineups', {
      url: '/previousLineups',
      templateUrl: 'app/views/previousLineups/previousTmpl.html',
      controller: 'previousCtrl'
    })
    .state('myLineups', {
      url: '/myLineups',
      templateUrl: 'app/views/savedLineups/savedTmpl.html',
      controller: 'savedCtrl'
    })
    .state('defenseStats', {
      url: '/defenseStats',
      templateUrl: 'app/views/defenseStats/statsTmpl.html',
      controller: 'statsCtrl'
    })
    .state('createLineup', {
      url: '/createLineup',
      templateUrl: 'app/views/createLineup/createTmpl.html',
      controller: 'createCtrl'
    })
    .state('playerStats', {
      url: '/playerStats',
      templateUrl: 'app/views/playerStats/playerTmpl.html',
      controller: 'playerStatsCtrl'
    });
  $urlRouterProvider.otherwise('/createLineup');

});
