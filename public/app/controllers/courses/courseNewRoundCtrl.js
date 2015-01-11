'use strict';
/* Controllers */
app.register.controller('courseNewRoundCtrl', ['$scope', '$http', '$location', '$routeParams',
    function ($scope, $http, $location, $routeParams) {
        //Todo: Define list route
        var listEvents = '/events';
        var listCourses = '/courses';
        var newRoundUrl = '/courses/newRound'
        var courseId = ($routeParams.id == 0) ? null : $routeParams.id;
        $scope.buttonText = 'Create New Round';
        initialize();

        function initialize() {
            $http.get(listCourses + '/' + courseId)
                .success(function (data) {
                    $scope.viewTitle = data.title;
                    $scope.item = {
                        refId: data._id,
                        title: data.title,
                        cost: data.cost,
                        description: data.description
                    };
                })
                .error(loadItemError);
        };

        //Save
        $scope.save = function (data) {
            if ($scope.editForm.$valid) {
                $scope.item.to = $("#to").val();
                $scope.item.from = $("#from").val();
                $http.post(newRoundUrl, data).success(processSaveSuccess).error(processSaveError);
            }
            else
            {
                alert("Please insert missing data");

            }
        };

        $scope.cancel = function () {
            $location.path(listCourses);
        };

        function processSaveSuccess(data) {
            //todo: update item.Text to the property that describe item title
            $location.path(listEvents);
        };

        function processSaveError(error) {
            //ui.showMessage("Error happened while saving: " + error.Message, "error");
            alert("Error happened while saving: " + error.Message, "error");
        };
        function loadItemError(error) {
            console.log(error);
            //ui.showMessage("Failed to load course, it may be deleted by someone else", "error");
            //$location.path(listRoute)
            alert("Error happened while loading: " + error.Message, "error");
        };
    }]);
//controller
