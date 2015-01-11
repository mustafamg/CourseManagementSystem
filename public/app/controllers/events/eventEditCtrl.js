'use strict';
/* Controllers */
app.register.controller('eventEditCtrl', ['$scope', '$http', '$location', '$routeParams',
    function ($scope, $http, $location, $routeParams) {
        //Todo: Define list route
        var listRoute = '/events';
        //Todo: Define api of the main crud course url path
        var apiBaseUrl = '/events';
        var eventId = ($routeParams.id == 0) ? null : $routeParams.id;
        var timer;
        //Todo: replace course with the main name of the object. i.e Create Expertise
        $scope.viewTitle = (eventId ? 'Edit' : 'Create') + " Event";// replace item
        $scope.buttonText = eventId ? 'Update' : 'Create';
        $scope.showDelete = eventId != null;
        initialize();

        function initialize() {
            //dataSource.initialize(apiBaseUrl);
            if (eventId)
                $http.get(apiBaseUrl + '/' + courseId)
                    .success(function (data) {
                        $scope.item = data;
                        console.log($scope.item);
                    })
                    .error(loadItemError);
            else
                $scope.item = {}; //Todo: Initial data for the new object goes here
            //Todo: load any needed lockups here and bind them to lists
            prepareUI();
        };
        function prepareUI() {

        }

        //Save
        $scope.save = function (data) {
            if ($scope.editForm.$valid) {
                $scope.item.to = $("#to").val();
                $scope.item.from = $("#from").val();
                if (!$scope.item._id)//New item
                    $http.post(apiBaseUrl, data).success(processSaveSuccess).error(processSaveError);
                else
                    $http.put(apiBaseUrl, data).success(processSaveSuccess).error(processSaveError);
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
        };
        function loadItemError(error) {
            console.log(error);
            //ui.showMessage("Failed to load course, it may be deleted by someone else", "error");
            //$location.path(listRoute)
        };
    }]);
//controller
