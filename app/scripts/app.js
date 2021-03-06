'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
    .module('app', [
        'ngRoute',
        'app.menu',
        'app.main'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
//            .when('/list', {
//                templateUrl: 'views/list.html',
//                controller: 'ListController'
//            })
//            .when('/tree', {
//                templateUrl: 'views/tree.html',
//                controller: 'TreeController'
//            })
//            .when('/edit', {
//                templateUrl: 'views/edit.html',
//                controller: 'EditController'
//            })
            .otherwise({
                redirectTo: '/'
            });
  });
