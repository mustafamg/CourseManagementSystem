'use strict';
/* Controllers */
    app.register.controller('serviceEditCtrl', ['$scope','$http', '$location', '$routeParams',
        function ($scope, $http, $location, $routeParams) {
            //Todo: Define list route
            var listRoute = '/services';
            //Todo: Define api of the main crud service url path
            var apiBaseUrl = '/services';
            var serviceId = ($routeParams.id==0) ? null: $routeParams.id ;
            var timer;
            //Todo: replace service with the main name of the object. i.e Create Expertise
            $scope.viewTitle = (serviceId ? 'Edit' : 'Create') + " Service";// replace item
            $scope.buttonText = serviceId ? 'Update' : 'Create';
            $scope.showDelete = serviceId != null;
            initialize();

            function initialize() {
                //dataSource.initialize(apiBaseUrl);
                if (serviceId)
                    $http.get(apiBaseUrl +'/' + serviceId)
                        .success(function (data) {
                            $scope.item = data;
                            console.log($scope.item);
                        })
                        .error(loadItemError);
                else
                    $scope.item = {}; //Todo: Initial data for the new object goes here
                //Todo: load any needed lockups here and bind them to lists
                prepareLockups();
            };
            function prepareLockups() {
                //use $http.get to load lockups
                //$http.get('/api/lockupItem').
                //    success(function (data) {
                //        $scope.lockupItems = data;
                //    }).
                //    error(ui.showMessage("Error loading lockups", "error"));
            }

            //Save
            $scope.save = function (data) {
                if ($scope.editForm.$valid) {
                    if (!$scope.item._id)//New item
                        $http.post(apiBaseUrl, data).success(processSaveSuccess).error(processSaveError);
                    else
                        $http.put(apiBaseUrl, data).success(processSaveSuccess).error(processSaveError);
                }
                else
                {
                    alert("Please insert missing data");

                }
            };

            $scope.cancel = function () {
                $location.path(listRoute);
            };

            function processSaveSuccess(data) {
                //todo: update item.Text to the property that describe item title
                //ui.showMessage($scope.item.Text + " is successfully saved", "success");
                $location.path(listRoute);
            };

            function processSaveError(error) {
                //ui.showMessage("Error happened while saving: " + error.Message, "error");
                alert("Error happened while saving: " + error.Message, "error");
            };
            function loadItemError(error) {
                console.log(error);
                //ui.showMessage("Failed to load service, it may be deleted by someone else", "error");
                //$location.path(listRoute)
                alert("Error happened while loading: " + error.Message, "error");
            };
        }]);
//controller
