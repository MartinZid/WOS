﻿describe('SearchCtrl', function () {

    var ctrl,
        $item,
        httpBackend;

    beforeEach(module('wos.controllers.search'));

    beforeEach(module(function ($provide) {
        $provide.factory('item', function ($http) {
            return {
                getAll: function () { },
                getDetail: function (id) { },
                search: function (query) {
                    return $http({
                        method: 'GET',
                        url: api.url + 'mobile/item?search=' + query
                    });
                }
            }
        })
    }));

    beforeEach(inject(function (_$controller_, item, $httpBackend) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?search=sekacka').respond({
            data: {
                'sekacka': {
                    'id': 28,
                    'jmeno': 'sekacka'
                }
            }
        });
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('searchText variable should be defined', function () {
        var $scope = {};
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        expect(typeof $scope.searchText).toBe('object');
    });
})