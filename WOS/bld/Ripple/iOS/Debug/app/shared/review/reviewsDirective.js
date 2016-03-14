'use strict';

angular.module('wos.directives.reviews', [])

.directive('review', function ($parse) {
    /// <summary>
    /// Review directive.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <returns type="object">Directive</returns>

    return {
        templateUrl: 'app/shared/review/reviewsView.html',
        link: function (scope, elem, attrs) {
            scope.review = $parse(attrs.item)(scope);
        }
    };
})