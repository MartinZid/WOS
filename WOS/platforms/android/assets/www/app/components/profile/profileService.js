'use strict';
angular.module('wos.services.profile', [])

.factory('profile', function ($http, api) {
    /// <summary>
    /// Factory for profile.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>
    return {
        getProfileData: function(id) {
            /// <summary>
            /// Returns a promise for profile detail. Used in profile detail controller.
            /// </summary>
            /// <param name="id" type="integer"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/user/user-profile?userID=' + id
            });
        }
    };
})