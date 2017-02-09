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
      danceService: function($http, $stateParams) {
        return $http.get(`/dances/${$stateParams.danceName}`);
      }
    },
    controller: function(danceService) {
      this.dance = danceService.data;
    },
    controllerAs: 'danceCtrl'
  })
  .state('dances.new', {
    url: '/:danceName/competition/new',
    templateUrl: '../dances/new-competition.html',
    controller: function($state, $stateParams, $http) {
      this.danceName = $stateParams.danceName;
      this.years = function(startYear) {
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;

        while ( startYear <= currentYear ) {
          years.push(startYear++);
        } 
        return years;
      }

      this.saveCompetition = function(competition) {
        $http({ method: 'POST', url: `/dances/${$stateParams.danceName}/competitions` , data: { competition } })
          .then(function() {
            $state.go('dances.competitions', { danceName: $stateParams.danceName });
          });
      }
    },
    controllerAs: 'competitionCtrl'
  })
});
