
require(
    [
        'app/app',
        'app/services/routeResolver',
        'app/services/dataSource',
        'app/services/modalService',
        'app/services/uiHeaderService',
        'app/services/eventsFilter',
        'app/controllers/uiHeaderController',
        'app/controllers/navBarController'
    ],
    function () {
        angular.bootstrap(document, ['myApp']);
    });
