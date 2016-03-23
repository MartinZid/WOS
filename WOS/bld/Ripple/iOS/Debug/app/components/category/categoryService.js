'use strict';
angular.module('wos.services.category', [])

.factory('category', function ($http, api) {
    /// <summary>
    /// Factory for categories.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">item</returns>

    return {
        getChildcategories: function (id) {
            /// <summary>
            /// Returns a promise for child categories of given category.
            /// </summary>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + '/add-item/returnchildcategories?data=' + id
            });
        }
    }

})