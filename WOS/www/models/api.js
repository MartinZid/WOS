'use strict';
angular.module('wos.api', [])

.factory('api', function () {
    return {
        url: 'http://sp2.binarity-testing.cz/api'
    }
})