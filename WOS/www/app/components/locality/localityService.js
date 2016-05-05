'use strict';
angular.module('wos.services.locality', [])

.factory('locality', function ($http, api) {
    /// <summary>
    /// Factory for categories.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">locality</returns>

    return {
        getUserLocalities: function (id) {
            /// <summary>
            /// Returns a promise for localities of given user.
            /// </summary>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/user/locality?userID=' + id
            });
        }
    }

})