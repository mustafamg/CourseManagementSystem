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
            controller: $controllerProvider.register,
            //directive: $compileProvider.directive,
            //filter: $filterProvider.register,
            //factory: $provide.factory,
            //service: $provide.service
        };
    		//$locationProvider.html5Mode(true);
            $routeProvider
                 
                .when('/main', {
                    templateUrl: 'partials/main',
                    controller: 'mainController'
                  })//route.resolve('main', 'main/', 'main'))
                .otherwise({ redirectTo: '/main' });
        }]);

//    return app;
//});





