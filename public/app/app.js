/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Thanks to Ward Bell for helping with the Breeze Integration
  http://twitter.com/WardBell
  http://neverindoubtnet.blogspot.com

  #######################################################################*/

'use strict';

//define(['services/routeResolver'], function () {

    var app = angular.module('myApp', ['ngRoute', 'ngResource']);// 'ui.bootstrap'

    app.config(['$routeProvider', '$locationProvider', '$filterProvider', '$httpProvider', '$controllerProvider',
        function ($routeProvider, $locationProvider, $filterProvider, $httpProvider, $controllerProvider) {
    		
    	app.register =
        {
            controller: $controllerProvider.register
            //directive: $compileProvider.directive,
            //filter: $filterProvider.register,
            //factory: $provide.factory,
            //service: $provide.service
        };
    		//$locationProvider.html5Mode(true);
            $routeProvider
                .when('/main', {
                    templateUrl: 'partials/main',
                    controller: 'mainCtrl'
                  })//route.resolve('main', 'main/', 'main'))
                .when('/courses', {
                    templateUrl: 'partials/courses',
                    controller: 'coursesCtrl'
                })
                .when('/courseEdit/:id', {
                    templateUrl: 'partials/course-edit',
                    controller: 'courseEditCtrl'
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
                .otherwise({ redirectTo: '/main' });
        }]);

//    return app;
//});





