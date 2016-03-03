'use strict';

angular.module('wos.directives', [])

.directive('wosItem', function ($parse, api, rating) {
    /// <summary>
    /// wosItem directive.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">Directive</returns>

    return {
        templateUrl: 'app/shared/item/itemView.html',
        link: function (scope, elem, attrs) {
            scope.item = $parse(attrs.name)(scope);
            scope.url = api.url;
                        
            scope.getFullStars = rating.getFullStars;
            scope.hasHalfStar = rating.hasHalfStar;
            scope.getEmptyStars = rating.getEmptyStars;
        }
    };
})