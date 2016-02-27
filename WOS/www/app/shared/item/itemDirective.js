'use strict';

angular.module('wos.directives', [])

.directive('wosItem', function($parse, api) {
    return {
        templateUrl: 'app/shared/item/itemView.html',
        link: function (scope, elem, attrs) {
            scope.item = $parse(attrs.name)(scope);
            scope.url = api.url;

            function countFullStars(num) {
                var intvalue = Math.floor(num);
                var halfStars = num * 10 % 10;
                return halfStars >= 7 ? intvalue + 1 : intvalue;
            }

            ///gets num as paramentr and returns Array with num size for full stars
            scope.getFullStars = function (num) {
                var intvalue = countFullStars(num);
                //console.log(intvalue + " " + halfStars + " " + num);
                return new Array(intvalue);
            };
            ///returns true if rating is between x.2 and x.7. (X represent whole number in range 0-4)
            scope.hasHalfStar = function (num) {
                var halfStars = num * 10 % 10;
                //console.log(halfStars);
                return halfStars > 2 && halfStars < 7;
            };
            ///gets num as paramentr and returns Array with num size for empty stars
            scope.getEmptyStars = function (num) {
                var fullStars = countFullStars(num);
                //console.log('Fullstars = ' + fullStars);
                var intvalue;
                intvalue = 5 - fullStars - scope.hasHalfStar(num);
                if (fullStars == 0)
                    intvalue = 0;

                //console.log(scope.item.nazev + " " + intvalue + " " + num + " " + fullStars);

                return new Array(intvalue);
            }
        }
    };
})