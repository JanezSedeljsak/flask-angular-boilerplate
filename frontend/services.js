app.service('$notes', function($http) {
    this.notes_api_uri = '/api/note/'
    this.get = function(titleFilter) {
        return $http.get([this.notes_api_uri, "get"].join("")).then(function(response) {
            return response.data;
        });
    };

    this.create = function(data) {
        return $http.post([this.notes_api_uri, "create"].join("")).then(function(response) {
            return response.data;
        });
    };

    this.modify = function(id, data) {
        return $http.post([this.notes_api_uri, "get/", id].join("")).then(function(response) {
            return response.data;
        });
    };

    this.delete = function(id) {
        return $http.post([this.notes_api_uri, "delete/", id].join("")).then(function(response) {
            return response.data;
        });
    };
});