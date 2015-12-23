'use strict';

angular
    .module('app.menu', [])
    .controller('menuController', function ($scope) {
        $scope.menuItems = [
            {
                title: 'Main page',
                link: '/',
                icon: 'main.png'
            },
            {
                title: 'List page',
                link: '/list',
                icon: 'list.png'
            },
            {
                title: 'Tree page',
                link: '/tree',
                icon: 'tree.png'
            },
            {
                title: 'Edit page',
                link: '/edit',
                icon: 'edit.png'
            }
        ];
    });