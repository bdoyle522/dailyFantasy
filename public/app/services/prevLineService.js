var app = angular.module('dailyFantasy');

app.service('prevLineService', function($q, $http){

  this.getPastLineups = function(){
    console.log('here');
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/getPrevious'
    }).then(function(response){
      console.log(response);
      dfd.resolve(response.data);
    })
    return dfd.promise;
  }
});
