'use strict';
angular.module('wos.services.notifications', [])

.factory('notifications', function ($http, api) {
    /// <summary>
    /// Factory for notifications.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>

    return {
        getAll: function (userId, code) {
            /// <summary>
            /// Returns all notifications of given user (userId).
            /// </summary>
            /// <param name="userId" type="type"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/user/notifications?userID=' + userId + '&code=' + code
            })
        }
    }
})