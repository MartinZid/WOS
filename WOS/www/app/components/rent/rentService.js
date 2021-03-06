﻿'use strict';
angular.module('wos.services.rent', [])

.factory('rent', function ($http, api) {
    /// <summary>
    /// Factory for rents and borrows.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">item</returns>

    return {
        getAll: function (id, code) {
            /// <summary>
            /// Returns a promise of all rents and borrows of user with given id
            /// </summary>
            /// <param name="id" type="type">userID</param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/rent?userID=' + id + '&code=' + code
            });
        },
        approve: function (id) {
            /// <summary>
            /// Returns a promise of rent approval.
            /// </summary>
            /// <param name="id" type="integer"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'PUT',
                url: api.url + 'mobile/rent/approve?rentID=' + id
            });
        },
        decline: function (id) {
            /// <summary>
            /// Returns a promise of rent decline.
            /// </summary>
            /// <param name="id" type="integer"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'PUT',
                url: api.url + 'mobile/rent/decline?rentID=' + id
            });
        },
        doReturn: function (id) {
            /// <summary>
            /// Returns a promise for rent return.
            /// </summary>
            /// <param name="id" type="integer"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'PUT',
                url: api.url + 'mobile/rent/return?rentID=' + id
            });
        }
    }

})