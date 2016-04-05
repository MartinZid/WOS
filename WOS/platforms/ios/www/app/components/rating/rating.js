'use strict';

angular.module('wos.rating', [])

.factory('rating', function ($http, api) {
    function countFullStars(num) {
        /// <summary>
        /// Counts how many full star should be generated from given rating.
        /// </summary>
        /// <param name="num" type="float">Rating</param>
        /// <returns type="integer"></returns>

        var intvalue = Math.floor(num);
        var halfStars = num * 10 % 10;
        return halfStars >= 7 ? intvalue + 1 : intvalue;
    };
    function hasHalfStar(num) {
        /// <summary>
        /// Returns true if rating is between x.2 and x.7. (X represent whole number in range 0-4)
        /// </summary>
        /// <param name="num" type="float">Rating</param>
        /// <returns type="bool"></returns>

        if (isNaN(num)) return;

        var halfStars = num * 10 % 10;
        return halfStars > 2 && halfStars < 7;
    };
    return {
        getFullStars: function (num) {
            /// <summary>
            /// Creates a array, which is used in generating full stars.
            /// </summary>
            /// <param name="num" type="float">Rating in range 0-5</param>
            /// <returns type="array">Array of size depending of rating. It is used for full stars loop</returns>

            if (isNaN(num)) return;

            var intvalue = countFullStars(num);
            return new Array(intvalue);
        },
        hasHalfStar: function (num) {
            return hasHalfStar(num);
        },
        getEmptyStars: function (num) {
            /// <summary>
            /// Creates a array, which is used in generating empty stars.
            /// </summary>
            /// <param name="num" type="float">Rating</param>
            /// <returns type="array">>Array of size depending of rating. It is used for empty stars loop.</returns>

            if (isNaN(num)) return;

            var fullStars = countFullStars(num);
            var intvalue;
            intvalue = 5 - fullStars - hasHalfStar(num);
            if (fullStars == 0)
                intvalue = 0;
            return new Array(intvalue);
        },
        rateLease: function (id, rating, text) {
            /// <summary>
            /// Uploads rating of given lease (id) to server.
            /// </summary>
            /// <param name="id" type="integer">Lease id</param>
            /// <param name="rating" type="integer"></param>
            /// <param name="text" type="String"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'POST',
                url: api.url + 'mobile/rent/rating?leaseID=' + id + '&rating=' + rating + '&text=' + text
            })
        }
    }
})