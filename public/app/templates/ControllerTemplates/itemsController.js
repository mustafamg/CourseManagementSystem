'use strict';
/* Controller that manage a list of items of certain type */

define(['app'], function (app) {
    //"item" referes to your main object of the crud operations
    app.register.controller('itemsController', ['$scope', '$location', 'dataSource', 'uiHeaderService',
        function ($scope, $location, dataSource, ui) {
            //todo: add your view title here
            $scope.viewTitle = "Items";
            //todo: Define creat button title
            $scope.createButtonTitle = "Create Item";
            //todo: define your edit rout here
            //dont forget to add rout for the controller in the app.js file
            var editRoute = "/itemEdit/";
            //todo: define your main baseurl of your main api restfull datasource
            var apiBaseUrl = "/api/Item";

            $scope.items = [];
            //Create
            $scope.new = function () {
                $location.path(editRoute + "0"); //0 means new items
            }
            //Edit
            $scope.edit = function (item) {
                $location.path(editRoute + item.Id);
            };
            //List
            $scope.list = function () {
                dataSource.getList()
                    .success(function (data) {
                        $scope.items = data;
                    })
                    .error(processLoadError);
            };
            //Delete
            $scope.delete = function (data) {
                //Todo: Assign title of your object for delete confirmation
                var itemTitle = data.Title;//Not necessary data.Title

                if (confirm("Are you sure you want to delete " + itemTitle + "?"))
                    dataSource.delete(data.Id).
                        //Process delete success
                        success(function () {
                        ui.showMessage(itemTitle + " deleted successfully", "warning");
                        $scope.items.splice($scope.items.indexOf(data), 1);
                        }).
                        //Process delete error
                        error(function (error) {
                            ui.showMessage('Unable to delete ' + itemTitle + ': ' + error.Mssage, 'error');
                        });
            };

            $scope.initialize = function initialize() {
                dataSource.initialize(apiBaseUrl);
                dataSource.getList()
                    .success(function (data) {
                        $scope.items = data;
                    })
                    .error(processLoadError);
            };
            $scope.initialize();
            //Todo: process load error here
            function processLoadError(error) {
                ui.showMessage('Unable to load data: ' + error.Message, 'error');
            };           
        }]);
});
//controller
