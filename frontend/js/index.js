var app = angular.module('appNameGoesHere', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: "./../views/home.html", controller: "HomeController" })
        .when('/login', { templateUrl: "./../views/login.html", controller: "LoginController" })
        .when('/register', { templateUrl: "./../views/register.html", controller: "RegisterController" })
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(false);

});

function mainCtrl($scope, $route, $routeParams, $location, $window) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.back = function () {
        $window.history.back();
    }
}

app.controller('HomeController', function ($scope, $location) {
    console.log("init home controller");
    //
})

app.controller('LoginController', function ($scope, $location) {
    console.log("init login controller");
    //
});

app.controller('RegisterController', function ($scope, $location) {
    console.log("init register controller");
    //
});