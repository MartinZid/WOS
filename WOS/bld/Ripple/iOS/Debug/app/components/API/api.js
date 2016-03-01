'use strict';
angular.module('wos.api', [])

.factory('api', function () {
    /// <summary>
    /// Factory for API.
    /// </summary>
    /// <returns type="object">API</returns>

    return {
        url: 'http://sp2.binarity-testing.cz/'
    }
})