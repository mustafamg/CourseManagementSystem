'use strict';

define(['app'], function (app) {
    app.factory('uiHeaderService', ['$rootScope', function ($rootScope) {
        var self = {};

        self.message = '';

        self.showMessage = function (message,messageType) {
            self.message = message;
            self.messageType = messageType;
            self.broadcastMessage();
        };

        self.broadcastMessage = function () {
            $rootScope.$broadcast('messageUpdated');
        };

        return self;
    }]);
});