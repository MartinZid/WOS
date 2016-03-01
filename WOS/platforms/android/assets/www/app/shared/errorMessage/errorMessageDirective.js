'use strict';

angular.module('wos.directives.errorMessage', [])

.directive('errorMessage', function ($parse) {
    return {
        link: function (scope, elem, attrs) {
            scope.reload = $parse(attrs.reload)(scope);
            scope.message = $parse(attrs.message)(scope);
        }
    }
})