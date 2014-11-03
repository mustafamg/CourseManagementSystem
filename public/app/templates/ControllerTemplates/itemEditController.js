'use strict';
/* Controller that manage creating new and updating existing item */


define(['app'], function (app) {

    app.register.controller('itemEditController', ['$scope', '$location', 'dataSource','$routeParams', '$timeout', 'uiHeaderService',
    function ($scope, $location, dataSource, $routeParams, $timeout, ui) {

        //Todo: Define list route
        var listRoute = '/items';
        //Todo: Define api of the main crud item url path
        var apiBaseUrl = '/api/item';
        var itemId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
        var timer;
        //Todo: replace item with the main name of the object. i.e Create Expertise
        $scope.viewTitle = ((itemId > 0) ? 'Edit' : 'Create') + " Item";// replace item
        $scope.buttonText = (itemId > 0) ? 'Update' : 'Create';
        $scope.showDelete = itemId > 0;
        initialize();

        function initialize() {
            dataSource.initialize(apiBaseUrl);
            if (itemId > 0)
                dataSource.get(itemId)
                    .success(function (data) {
                        $scope.item = data;
                    })
                    .error(loadItemError);
            else
                $scope.item = {}; //Todo: Initial data for the new object goes here
            //Todo: load any needed lockups here and bind them to lists
            prepareLockups();
        };
        function prepareLockups() {
            //use $http.get to load lockups
            $http.get('/api/lockupItem').
                success(function (data) { $scope.lockupItems = data; }).
            error(ui.showMessage("Error loading lockups","error"));
        }

        //Save
        $scope.save = function (data) {
            if ($scope.editForm.$valid) {
                if (!$scope.item.Id)//New item
                    dataSource.insert(data).success(processSaveSuccess).error(processSaveError);
                else
                    dataSource.update(data).success(processSaveSuccess).error(processSaveError);
            }
        };
        //Delete
        $scope.delete = function (item) {
            var itemTitle = item.Title; //Todo: Assign title of your object for delete confirmation

            if (confirm("Are you sure you want to delete " + itemTitle + "?"))
                dataSource.delete(item.Id).
                    success(function () {
                        ui.showMessage(itemTitle + " deleted successfully", "warning");
                        $location.path(listRoute);
                    }).
                    //Process delete error
                    error(function (error) {
                        ui.showMessage('Unable to delete ' + itemTitle + ': ' + error.Mssage, 'error');
                    });
        };

        $scope.cancel = function () {
            $location.path(listRoute);
        };

        function processSaveSuccess(data) {
            //todo: update item.Text to the property that describe item title
            ui.showMessage($scope.item.Text + " is successfully saved", "success");
            $location.path(listRoute);
        };

        function processSaveError(error) {
            ui.showMessage("Error happened while saving: " + error.Message, "error");
        };
        function loadItemError(error) {
            ui.showMessage("Failed to load item, it may be deleted by someone else", "error");
            $location.path(listRoute)
        };
    }]);
});