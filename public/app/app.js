/*#######################################################################
  
  Mustafa Gamal
  http://twitter.com/mustafamg

  #######################################################################*/

'use strict';

    var app = angular.module('myApp', ['ngRoute', 'ngResource']);

    app.config(['$routeProvider', '$locationProvider', '$filterProvider', '$httpProvider', '$controllerProvider',
        function ($routeProvider, $locationProvider, $filterProvider, $httpProvider, $controllerProvider) {
    		
    	app.register =
        {
            controller: $controllerProvider.register
        };

            $routeProvider
                .when('/main', {
                    templateUrl: 'partials/main',
                    controller: 'mainCtrl'
                  })
                .when('/courses', {
                    templateUrl: 'partials/courses',
                    controller: 'coursesCtrl'
                })
                .when('/courseEdit/:id', {
                    templateUrl: 'partials/course-edit',
                    controller: 'courseEditCtrl'
                })
                .when('/courseNewRoundCtrl/:id', {
                    templateUrl: 'partials/course-new-round',
                    controller: 'courseNewRoundCtrl'
                })
                .when('/events', {
                    templateUrl: 'partials/events',
                    controller: 'eventsCtrl'
                })
                .when('/eventEdit/:id', {
                    templateUrl: 'partials/event-edit',
                    controller: 'eventEditCtrl'
                })
                .when('/services', {
                    templateUrl: 'partials/services',
                    controller: 'servicesCtrl'
                })
                .when('/serviceEdit/:id', {
                    templateUrl: 'partials/service-edit',
                    controller: 'serviceEditCtrl'
                })
                .when('/serviceRequests/:serviceId', {
                    templateUrl: 'partials/serviceRequests',
                    controller: 'serviceRequestsCtrl'
                })
                .otherwise({ redirectTo: '/main' });
        }]);






