﻿describe('ItemDetailCtrl', function () {

    var ctrl,
        $item,
        httpBackend,
        rating,
        stateParams,
        ionicSlideBoxDelegateMock,
        ionicPopoverMock;

    beforeEach(module('wos.controllers.itemDetail'));

    beforeEach(module(function ($provide) {
        $provide.factory('item', function ($http) {
            return {
                getAll: function () { },
                getDetail: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/item?itemID=22'
                    });
                }
            }
        })
    }));

    beforeEach(module(function ($provide) {
        $provide.factory('rating', function () {
            return {
                getFullStars: function (num) { },
                hasHalfStar: function (num) { },
                getEmptyStars: function (num) { }
            }
        });
    }));

    beforeEach(inject(function (_$controller_, item, $httpBackend, _rating_, $q) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        stateParams = { itemId: 22 };
        rating = _rating_;
        ionicSlideBoxDelegateMock = jasmine.createSpyObj('$ionicSlideBoxDelegate spy', ['update']);
        ionicPopoverMock = {
            fromTemplateUrl: jasmine.createSpy('popover spy')
                             .and.returnValue($q.defer().promise)
        };
        cordovaGeolocationMock = jasmine.createSpyObj('$cordovaGeolocation spy', ['getCurrentPosition']);
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=22').respond({
            data: {
                'sekacka': {
                    'id': 28,
                    'jmeno': 'sekacka',
                    'prumerne_hodnoceni': 0,
                    'rating': 0
                }
            }
        });
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            rating: rating, $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock
        });
        expect($scope.status).toBe(3);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            rating: rating, $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock
        });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('ionic popover should be created', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            rating: rating, $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock
        });
        expect(ionicPopoverMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('rating functions should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            rating: rating, $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock
        });
        expect(typeof $scope.getFullStars && typeof $scope.hasHalfStar && typeof $scope.getEmptyStars).toBe('function');
    });
})