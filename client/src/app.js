const app = angular.module('dance', []);

app.controller('DanceController', function($http) {
    $http.get('/dances').then((response) => {
        this.dances = response.data;
    });
});