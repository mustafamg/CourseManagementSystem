'use strict';
/* Controllers */


define(['app'], function (app) {

    app.register.controller('expertiseEditController', ['$scope', '$location', 'dataSource', 'modalService','$routeParams','$timeout','uiHeaderService',
    function ($scope, $location, dataSource, modalService, $routeParams, $timeout,ui) {
            console.log("I'm in edit");
            var expertiseId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
            var timer;
            var listRoute = '/expertises';
            $scope.expertise;
            $scope.viewTitle = ((expertiseId > 0) ? 'Edit' : 'Create') + " Expertise";
            $scope.buttonText = (expertiseId > 0) ? 'Update' : 'Create';
            $scope.showDelete = expertiseId > 0;
            initialize();

            function initialize() {

                dataSource.initialize('/api/Expertise');
                if (expertiseId > 0)
                    dataSource.get(expertiseId)
                        .success(function (exps) {
                            $scope.expertise = exps;
                        })
                        .error(prepareForEditError);
                else
                    $scope.expertise = {}; //Todo: Initial data for new object goes here
                //Todo: Get any needed lockups here and bind them to lists
            };

            //Save
            $scope.save = function (data) {
                if ($scope.editForm.$valid) {
                    if (!$scope.expertise.Id)//New expertise
                        dataSource.insert(data).success(processSuccess).error(processError);
                    else
                        dataSource.update(data).success(processSuccess).error(processError);
                }
            };
            //Delete
            $scope.delete = function (expert) {
                if (confirm("Are you sure you want to delete " + expert.Text + "?"))
                    dataSource.delete(expert.Id, listRoute);
            };
            //Cancel
            $scope.cancel = function () {
                $location.path(listRoute);
            };

            function processSuccess(data) {
                ui.showMessage($scope.expertise.Text + " Saved successfully", "success");
                $location.path(listRoute);
            };

            function processError(error) {
                ui.showMessage("Error saving expertise: " + error.Message, "error");
            };
            function prepareForEditError(error) {
                debugger;
                ui.showMessage("Failed to load expertise, it may be deleted by someone else", "error");
                $location.path(listRoute)
            };

        }]);
});