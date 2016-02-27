'use strict';

angular.module('wos.directives', [])

.directive('wosItem', function($parse, api) {
    return {
        templateUrl: 'app/shared/item/itemView.html',
        link: function (scope, elem, attrs) {
            scope.item = $parse(attrs.name)(scope);
            scope.url = api.url;

            ///gets num as paramentr and returns Array with num size
            scope.getNumber = function (num) {
                return new Array(num);
            }
        }
    };
})