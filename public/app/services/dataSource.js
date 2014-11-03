'use strict';

define(['app'], function (app) {
    app.factory('dataSource', ['$http', 'promiseTracker', 'uiHeaderService', '$location', function ($http, promiseTracker, ui, $location) {

        var urlBase;
        var dataSource = {};
        var loadingTracker = promiseTracker('loading');
        dataSource.initialize = function (baseUrl) {
            dataSource.initialized = true;
            urlBase = baseUrl;//Todo: if '/' exist, remove it. hint(it is beter to reverse the code to use it)
        }

        dataSource.getList = function (param) {
            if (param) {
                return dataSource.track($http.get(urlBase, { params: param }));
            }
            else {
                return dataSource.track($http.get(urlBase));
            }
        };
        dataSource.get = function (id) {
            return dataSource.track($http.get(urlBase + '/' + id));
        }

        dataSource.insert = function (data, param) {
            if (!param)
                return dataSource.track($http.post(urlBase, data));
            else
                return dataSource.track($http.post(urlBase, data, { params: param }));
        };

        dataSource.update = function (data) {
            return dataSource.track($http.put(urlBase + '/' + data.Id, data));
        };
        dataSource.updateById = function (id, data) {
            return dataSource.track($http.put(urlBase + '/' + id, data))
        };

        dataSource.delete = function (id, list, item) {
            return dataSource.track($http.delete(urlBase + '/' + id).
                    success(function () {
                        ui.showMessage("Deleted successfully", "warning");
                        if (item)
                            list.splice(list.indexOf(item), 1);
                        else
                            $location.path(list);
                    }).
                    error(function (error) {
                        ui.showMessage("Unfortunately we can't delete this record, other data is depending on it", 'error');
                    })
                    );
        };
        dataSource.track = function (promise) {
            loadingTracker.addPromise(promise);
            return promise;
        }
        return dataSource;

    }]);
});
