'use strict';

angular.module('wos.directives.errorMessage', [])

.directive('errorMessage', function ($parse) {
    /// <summary>
    /// error message directive. Handles error status codes.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <returns type="object">Directive</returns>
    return {
        scope: { reload: '&', status: '='},
        templateUrl: 'app/shared/errorMessage/errorMessageView.html'
    }
})