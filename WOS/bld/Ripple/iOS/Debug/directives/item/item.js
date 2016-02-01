'use strict';

angular.module('wos.directives', [])

.directive('wosItem', function($parse) {
    return {
        templateUrl: 'directives/item/item.html',
        link: function (scope, elem, attrs) {
            scope.item = $parse(attrs.name)(scope);
        }
    };
})