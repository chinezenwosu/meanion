const app = angular.module('dance', []);

app.controller('DanceController', function() {
    this.dances = ['Ballet', 'Tango', 'Rumba', 'Salsa', 'Samba', 'Cakewalk', 'Bolero', 'Cha-cha', 'Veleta'];
});