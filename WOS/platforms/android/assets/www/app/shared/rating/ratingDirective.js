'use strict';

angular.module('wos.directives.rating', [])

.directive('rating', function ($parse, rating) {
    /// <summary>
    /// Rating directive. Displayes rating stars according to given rating.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <returns type="object">Directive</returns>
    return {
        scope: { rating: '=' },
        templateUrl: 'app/shared/rating/ratingView.html'
    }
    scope.getFullStars = rating.getFullStars;
    scope.hasHalfStar = rating.hasHalfStar;
    scope.getEmptyStars = rating.getEmptyStars;
})