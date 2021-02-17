var app = angular.module('appTitleGoesHere', [], function ($routeProvider, $locationProvider) {

    const loggedIn = function ($location) {
        const authToken = localStorage.getItem('kfm_');
        if (!authToken)
            $location.url('/login');
    }

    $routeProvider
        .when('/', { templateUrl: "./views/default.html", controller: "DefController" })
        .when('/login', { templateUrl: "./views/login.html", controller: "LoginController" })
        .when('/register', { templateUrl: "./views/register.html", controller: "RegisterController" })
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(false);

});

function MainCtrl($scope, $route, $routeParams, $location, $window) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.back = function () {
        $window.history.back();
    }
}


app.controller('DefController', function ($scope, $location) {
});

app.controller('LoginController', function ($scope, $location) {
});

app.controller('RegisterController', function ($scope, $location) {
});