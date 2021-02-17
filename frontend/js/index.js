var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.initMessage = "This message is from angular";
});