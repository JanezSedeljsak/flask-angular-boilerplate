var app = angular.module('appTitleGoesHere', [], function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: "./views/default.html", controller: "DefController" })
        .when('/preview/:id', { templateUrl: "./views/note_preview.html", controller: "PreviewController" })
        .when('/edit/:id', { templateUrl: "./views/note_form.html", controller: "NoteModifyController" })
        .when('/create', { templateUrl: "./views/note_form.html", controller: "NoteCreateController" })
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


app.controller('DefController', function ($scope, $navigate, $notes) {
    $scope.notes = [];
    $scope.filterText = "";
    $scope.init = function() {
        $notes.get($scope.filterText).then(function(result) {
            $scope.notes = result;
        });
    }

    $scope.createNote = function() {
        $navigate.goTo("/#/create");
    }

    $scope.modifyNote = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.previewNote = function(id) {
        $navigate.goTo(["/#/preview/", id].join(""));
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted")
                $navigate.goTo("/#/"); // go to home page after create
            });
        }
    }
});

app.controller('PreviewController', function ($scope, $navigate, $notes, $routeParams) {
    $scope.note = {};
    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
        });
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }

    $scope.modifyNote = function(id) {
        $navigate.goTo(["/#/edit/", id].join(""));
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
                $navigate.goTo("/#/"); // go to home page after create
            });
        }
    }
});

app.controller('NoteCreateController', function ($scope, $navigate, $notes) {
    $scope.init = function() {};
    $scope.note = {
        "Title": "",
        "Description": ""
    };

    $scope.submit = function() {
        $notes.create($scope.note).then(function(result) {
            alert("Note was created!");
            $navigate.goTo("/#/"); // go to home page after create
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});

app.controller('NoteModifyController', function ($scope, $navigate, $notes, $routeParams) {
    $scope.note = {};
    $scope.isEdit = true;

    $scope.init = function() {
        $notes.getById($routeParams.id).then(function(result) {
            $scope.note = result;
            console.log(result);
        });
    }

    $scope.deleteNote = function(id) {
        if (confirm("Are you sure you want to delete this note?")) {
            $notes.delete(id).then(function(result) {
                alert("Note was deleted");
                $navigate.goTo("/#/"); // go to home page after create
            });
        }
    }

    $scope.submit = function() {
        $notes.modify($routeParams.id, $scope.note).then(function(result) {
            alert("Note was updated!");
            $scope.init();
        })
    }

    $scope.goBack = function() {
        $navigate.goBack();
    }
});
