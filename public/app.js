var app = angular.module('dailyFantasy', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('frontPage', {
      url: '/',
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
      templateUrl: 'app/views/previousLineups/prevLineTmpl.html',
      controller: 'prevLineCtrl'
    })
    .state('savedLineups', {
      url: '/savedLineups',
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
    });
  $urlRouterProvider.otherwise('/');



});
