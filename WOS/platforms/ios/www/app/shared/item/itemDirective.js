﻿'use strict';

angular.module('wos.directives.item', [])

.directive('wosItem', function ($parse, api) {
    /// <summary>
    /// wosItem directive.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">Directive</returns>

    return {
        templateUrl: 'app/shared/item/itemView.html',
        link: function (scope, elem, attrs) {
            scope.item = $parse(attrs.name)(scope);
            scope.url = api.url;
        }
    };
})