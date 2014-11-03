'use strict';

define(['app'], function (app) {
    app.service('eventsFilter', function () {
        var filter = {};            
        this.setFilter = function (from, to) {
            if (from)
                filter = { from: from, to: to };
            else
                filter = {};
        };
        this.getFilter = function () {
            return filter;
        };        
    });
});
