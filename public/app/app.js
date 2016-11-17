var app = angular.module('mainApp', ['angular-loading-bar', 'ngAnimate', 'ui.layout', 'ui.sortable']);

app.factory('socket', function() {
    var socket = io();
    return socket;
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

app.config(['$interpolateProvider',
    function($interpolateProvider) {
        // Swig uses {{}} for variables which makes it clash with the use of {{}} in AngularJS.
        // Replaced use of {{}} with [[]] in AngularJS to make it work with Swig.
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);

