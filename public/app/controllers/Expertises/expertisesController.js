'use strict';
/* Controllers */

define(['app'], function (app) {
    app.register.controller('expertisesController', ['$scope', '$location', 'dataSource', 'uiHeaderService',
        function ($scope, $location, dataSource, ui) {
            $scope.viewTitle = "Expertise";
            $scope.expertises = [];
            //Create
            $scope.new = function () {
                $location.path("expertiseEdit/0"); //0 means new customer
            }
            //Edit
            $scope.edit = function (expertise) {
                $location.path("expertiseEdit/" + expertise.Id);
            };
            //Delete
            $scope.delete = function (expert) {
                if (confirm("Are you sure you want to delete " + expert.Text + "?"))
                    dataSource.delete(expert.Id, $scope.expertises, expert);
            };
            $scope.initialize = function initialize() {
                dataSource.initialize('/api/Expertise');
                dataSource.getList()
                    .success(function (exps) {
                        $scope.expertises = exps;
                    })
                    .error(function (error) {
                        ui.showMessage('Unable to load Expertise data: ' + error.Message, 'error');
                    });
            };
            $scope.initialize();
        }]);

});
//controller
