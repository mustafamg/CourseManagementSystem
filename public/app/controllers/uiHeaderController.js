'use strict';
/* Controllers */

define(['app'], function (app) {
    app.controller('uiHeaderController', ['$scope', 'uiHeaderService', '$timeout',
        function ($scope, uiHeaderService, $timeout) {
            var timer;
            $scope.updateStatus = false;
            $("#header-message").hide();
            $scope.$on('messageUpdated', function () {
                switch (uiHeaderService.messageType) {
                    case "success":
                        processMessage(uiHeaderService.message, "alert-success");
                        break;
                    case "error":
                        processMessage(uiHeaderService.message, "alert-danger");
                        break;
                    case "warning":
                        processMessage(uiHeaderService.message, "alert-warning");
                        break;
                    default:
                        processMessage(uiHeaderService.message, "alert-info");
                }
                $scope.updateStatus = true;

            });

            function processMessage(message, style) {
                $scope.message = message;
                $("#header-message").slideDown();
                $scope.showMessage = true;
                $scope.messageClass = style;
                startTimer();
            };

            function startTimer() {
                timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $scope.message = '';
                    $("#header-message").slideUp();
                    $scope.showMessage = false;
                }, 5000);
            };
        }]);
});

