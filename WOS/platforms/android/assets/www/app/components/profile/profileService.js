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
        },
        registerUser: function (name, surname, email, password) {
            /// <summary>
            /// Registers user.
            /// </summary>
            /// <param name="name" type="type"></param>
            /// <param name="surname" type="type"></param>
            /// <param name="email" type="type"></param>
            /// <param name="password" type="type"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/registration/default?name=' + name + '&surname=' + surname + '&email' + email + '&pass=' + password
            })
        },
        forgottenPassword: function (email) {
            /// <summary>
            /// Resets user password.
            /// </summary>
            /// <param name="email" type="type"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'PUT',
                url: api.url + 'mobile/user/forgotten-password/defaul?email=' + email
            })
        }
    };
})