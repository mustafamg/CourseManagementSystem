'use strict';
/* Controllers */
    app.register.controller('servicesCtrl', ['$scope','$http', '$location',
        function ($scope, $http, $location) {
            //todo: add your view title here
            $scope.viewTitle = "Items";
            //todo: Define creat button title
            $scope.createButtonTitle = "Create Item";
            //todo: define your edit rout here
            //dont forget to add rout for the controller in the app.js file
            var editRoute = "/serviceEdit/";
            //todo: define your main baseurl of your main api restfull datasource
            var apiBaseUrl = "/services/";

            $scope.items = [];
            //Create
            $scope.new = function () {
                $location.path(editRoute + "0"); //0 means new items
            };
            //Edit
            $scope.edit = function (item) {
                console.log(editRoute + item._id);
                $location.path(editRoute + item._id);
            };

            //Delete
            $scope.delete = function (data) {
                //Todo: Assign title of your object for delete confirmation
                var itemTitle = data.title;//Not necessary data.Title

                if (confirm("Are you sure you want to delete " + itemTitle + "?"))
                    $http.delete(apiBaseUrl+ data._id).
                        //Process delete success
                        success(function () {
                            //ui.showMessage(itemTitle + " deleted successfully", "warning");
                            $scope.items.splice($scope.items.indexOf(data), 1);
                        }).
                        //Process delete error
                        error(function (error) {
                            //ui.showMessage('Unable to delete ' + itemTitle + ': ' + error.Mssage, 'error');
                        });
            };

            //List
            $scope.list = function () {
                $http.get(apiBaseUrl)
                    .success(function (data) {
                        $scope.items = data.serviceList;
                    })
                    .error(processLoadError);
            };
            //initializing
            $scope.list();
            //Todo: process load error here
            function processLoadError(error) {
                //ui.showMessage('Unable to load data: ' + error.Message, 'error');
                alert("Error happened while loading: " + error.Message, "error");
            };
        }]);
//controller
