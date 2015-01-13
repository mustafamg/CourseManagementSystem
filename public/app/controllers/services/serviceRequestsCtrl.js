'use strict';
/* Controllers */
app.register.controller('serviceRequestsCtrl', ['$scope','$http', '$location','$routeParams',
    function ($scope, $http, $location,$routeParams) {
        //dont forget to add rout for the controller in the app.js file


        $scope.createButtonTitle = "Create Item";

        var serviceId = $routeParams.serviceId;
        var listRout = "/services";
        var apiBaseUrl = "/serviceRequests/";

        $scope.items = [];

        $scope.back = function () {
          $location.path(listRout)
        };
        //List
        $scope.list = function () {
            $http.get(apiBaseUrl + serviceId)
                .success(function (data) {
                    $scope.viewTitle = data.service.title;

                    $scope.requests = data.requests;
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
