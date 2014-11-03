'use strict';

define([], function () {

    var services = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    services.provider('routeResolver', function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/partials/',// was app/view
                controllersDirectory = '/app/controllers/',

            setBaseDirectories = function (viewsDir, controllersDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
            },

            getViewsDirectory = function () {
                return viewsDirectory;
            },

            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (controllerName, path, viewPath) {
                if (!path) path = '';

                var routeDef = {};
                //Todo: M. Gamal: Update to support asp.net MVC views
                routeDef.templateUrl = viewPath ? viewPath : routeConfig.getViewsDirectory() + path + controllerName + '.html';
                routeDef.controller = controllerName + 'Controller';
                console.log("view: " + routeDef.templateUrl);
                console.log("controller: " + routeDef.controller);
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [routeConfig.getControllersDirectory() + path + controllerName + 'Controller.js'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };

                return routeDef;
            },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            }
        }(this.routeConfig);
    });

});
