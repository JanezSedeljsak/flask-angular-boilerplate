var app = angular.module('appTitleGoesHere', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: "./views/default.html", controller: "DefController" })
        .when('/preview/:id', { templateUrl: "./views/note_preview.html", controller: "PreviewController" })
        .when('/edit/:id', { templateUrl: "./views/note_form.html", controller: "NoteCreateController" })
        .when('/create', { templateUrl: "./views/note_form.html", controller: "NoteModifyController" })
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


app.controller('DefController', function ($scope, $location, $notes) {
    $scope.notes = [];
    $scope.filterText = "";
    $scope.init = function() {
        $notes.get($scope.filterText).then(function(result) {
            $scope.notes = result;
        });
    }

    $scope.createNote = function() {
        window.location.href = "/#/create"
    }

    $scope.modifyNote = function(id) {
        window.location.href = ["/#/edit/", id].join("");
    }

    $scope.previewNote = function(id) {
        window.location.href = ["/#/preview/", id].join("");
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
            });
        }
    }
});

app.controller('PreviewController', function ($scope, $location, $notes, $routeParams) {
    $scope.note = {};
    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
        });
    }

    $scope.goBack = function() {
        history.go(-1);
    }

    $scope.modifyNote = function(id) {
        window.location.href = ["/#/edit/", id].join("");
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
            });
        }
    }
});

app.controller('NoteCreateController', function ($scope, $location, $notes) {
    $scope.init = function() {};
    $scope.note = {
        "Title": "",
        "Description": ""
    };

    $scope.submit = function() {
        console.log($scope.note);
    }
});

app.controller('NoteModifyController', function ($scope, $location, $notes, $routeParams) {
    $scope.note = {};
    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
        });
    }

    $scope.submit = function() {
        console.log($scope.note);
    }
});
