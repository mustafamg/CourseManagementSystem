'use strict';
/* Controllers */
    app.register.controller('mainCtrl', ['$scope',
        function ($scope) {
         $scope.courseRequests =[
                                 {courseName:"SOA", courseDuration:3},
                                 {courseName:"Sw Arch", courseDuration:3},
                                 {courseName:"TDD", courseDuration:2}
                                 ];
         $scope.serviceRequests =[
                                 {serviceName:"Arch Consultation", courseDuration:3},
                                 {serviceName:"Agile Cons", courseDuration:3},
                                 {serviceName:"ITIL Consultation", courseDuration:2}
                                 ];
        }]);
//controller
