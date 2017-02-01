import 'angular-ui-router';

const app = angular.module('dance', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/dances');
  $stateProvider
  .state('dances', {
    url: '/dances',
    templateUrl: '../dances/nav.html',
    resolve: {
      dancesService: function($http) {
        return $http.get('/dances');
      }
    },
    controller: function(dancesService) {
      this.dances = dancesService.data;
    },
    controllerAs: 'dancesCtrl'
  })
  .state('dances.competitions', {
    url: '/:danceName',
    templateUrl: '../dances/competitions.html',
    resolve: {
      danceService: function($q) {
        return $q((resolve, reject) => {
          let dance = {
            'name': 'Ballet',
            'competitions': [
              {
                'name': 'Dancathona',
                'winner': 'Jane Affleck',
                'year': 2014
              },
              {
                'name': 'Brena National Dance Competition',
                'winner': 'Jane Affleck',
                'year': 2015
              },
            ]
          };
          resolve({ data: dance });
        });
      }
    },
    controller: function(danceService) {
      this.dance = danceService.data;
    },
    controllerAs: 'danceCtrl'
  })
});
