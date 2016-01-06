var app = angular.module('dailyFantasy');

app.service('savedService', function($q, $http){

  this.getSavedLineups = function(){
    console.log('here');
    return $http({
      method: 'GET',
      url: '/getPrevious'
    })
  }
});
