'use strict';

angular.module('wos.directives.errorMessage', [])

.directive('errorMessage', function ($parse) {
    return {
        scope: { reload: '&', message: '=', status: '='},
        templateUrl: 'app/shared/errorMessage/errorMessageView.html'
    }
})