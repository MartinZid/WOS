'use strict';

angular.module('wos.directives.rating', [])

.directive('starsRating', function ($parse, rating) {
    /// <summary>
    /// Rating directive. Displayes rating stars according to given rating.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <param name="rating" type="type"></param>
    /// <returns type="object">Directive</returns>

    return {
        templateUrl: 'app/shared/rating/ratingView.html',
        //scope: {
        //    rating: '=',
        //    getFullStars: rating.getFullStars,
        //    hasHalfStar: rating.hasHalfStar,
        //    getEmptyStars: rating.getEmptyStars
        //}
        link: function (scope, elem, attrs) {

            attrs.$observe('rating', function (value) {
                scope.rating = value;
            });

            //scope.rating = $parse(attrs.rating)(scope);

            scope.getFullStars = rating.getFullStars;
            scope.hasHalfStar = rating.hasHalfStar;
            scope.getEmptyStars = rating.getEmptyStars;
        }
    };
})