'use strict';

angular.module('wos.directives.item', [])

.directive('wosItem', function ($parse, api, $state) {
    /// <summary>
    /// wosItem directive.
    /// </summary>
    /// <param name="$parse" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">item directive</returns>

    return {
        templateUrl: 'app/shared/item/itemView.html',
        link: function (scope, elem, attrs) {
            // get item object from attr and save it to scope
            scope.item = $parse(attrs.name)(scope);
            scope.url = api.url;
            scope.goToDetail = function () {
                /// <summary>
                /// Redirects user to item detail.
                /// </summary>
                $state.go('tab.item-detail', { itemId: scope.item.id_instance })
            }
        }
    };
})