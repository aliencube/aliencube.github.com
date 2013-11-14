(function (angular) {
    var module = angular.module("aliencubeApp", []);

    module.filter("homepage", function () {
        return function (condition, truevalue, falsevalue) {
            return condition ? (truevalue.match(/^https?:\/\//gi) ? truevalue : "http://" + truevalue) : falsevalue;
        };
    });

    module.value("settings", function () {
        return {
            url: "https://api.github.com/orgs/aliencube/repos"
        };
    });

    module.controller("repositoryController", function ($scope, $http, settings) {
        var _settings = settings();
        $http
            .jsonp(_settings.url + "?callback=JSON_CALLBACK")
            .success(function (result) {
                $scope.repositories = result.data;
            });
    });
})(angular);
