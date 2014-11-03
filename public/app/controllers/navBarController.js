'use strict';

define(['app'], function (app) {

    app.controller('navBarController', ['$scope', '$location', 'config', function ($scope, $location, config) {
        var appTitle = 'Training Manager';
        $scope.appTitle = appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
    }]);

});