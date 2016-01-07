'use strict';

angular
    .module('app.main', [])
    .factory('professionList', function () {
        return [
            {
                id: 1,
                name: 'farmer'
            },
            {
                id: 2,
                name: 'lumberjack'
            },
            {
                id: 3,
                name: 'stonecutter'
            }
        ];
    })
    .controller('MainController', ['$scope', 'professionList', function ($scope, professionList) {
        

        $scope.professionList = professionList;
    }]);
