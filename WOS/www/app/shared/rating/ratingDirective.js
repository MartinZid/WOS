'use strict';

angular.module('wos.directives.rating', [])

.directive('starsRating', function ($parse, rating) {
    /// <summary>
    /// Rating directive. Displayes rating stars according to given rating.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <param name="rating" type="type"></param>
    /// <returns type="object">rating directive</returns>

    return {
        templateUrl: 'app/shared/rating/ratingView.html',
        link: function (scope, elem, attrs) {

            attrs.$observe('rating', function (value) {
                /// <summary>
                /// Update value for every view.
                /// </summary>
                /// <param name="value" type="type"></param>
                scope.rating = value;
            });

            // define rating service methods
            scope.getFullStars = rating.getFullStars;
            scope.hasHalfStar = rating.hasHalfStar;
            scope.getEmptyStars = rating.getEmptyStars;
        }
    };
})