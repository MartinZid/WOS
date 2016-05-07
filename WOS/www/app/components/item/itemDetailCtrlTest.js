'use strict';

describe('ItemDetailCtrl', function () {

    var ctrl,
        $item,
        httpBackend,
        stateParams,
        ionicSlideBoxDelegateMock,
        ionicPopoverMock,
        response,
        ionicHistoryMock,
        stateMock,
        ionicModalMock,
        cordovaGeolocationMock;

    beforeEach(module('wos.controllers.itemDetail'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.services.cart'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function ($http) {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        })
    }));

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

    beforeEach(inject(function (_$controller_, item, api, $httpBackend, $q) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        stateParams = { itemId: 22 };
        api = api;
        ionicSlideBoxDelegateMock = jasmine.createSpyObj('$ionicSlideBoxDelegate spy', ['update']);
        ionicPopoverMock = {
            fromTemplateUrl: jasmine.createSpy('popover spy')
                             .and.returnValue($q.defer().promise)
        };
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise)
        };
        ionicHistoryMock = {
            backView: jasmine.createSpy('backView spy').and.returnValue({
                stateId: {
                    indexOf: function() { return true}
                }
            })
        }
        stateMock = jasmine.createSpy('$state spy', ['go']);
        cordovaGeolocationMock = {
            getCurrentPosition: jasmine.createSpy('getCurrentPosition spy')
                                .and.returnValue($q.defer().promise)
        };
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=22');
        response.respond([{
            photos: []
        }]);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set item id variable to 22', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect($scope.id).toBe(22);
    });
    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('ionic popover should be created', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect(ionicPopoverMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('should define calendar config object', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect($scope.uiConfig.calendar).not.toBe(undefined);
    });
    it('isInArray should return true, if an event is already in array', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        var event = {
            start: new Date(2015, 6, 7),
            end: new Date(2015, 7, 8)
        };
        var events = [{
            start: new Date(2015, 6, 7),
            end: new Date(2015, 7, 8)
        }, {
            start: new Date(2015, 10, 7),
            end: new Date(2016, 1, 9)
        }];
        expect($scope.isInArray(event, events)).toBe(true);
    });
    it('should define eventSources for the ui calendar', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect($scope.eventSources).not.toBe(undefined);
    });
    it('should create ionic modal', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('open reviews modal, should set $scope.reviews', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        httpBackend.flush();
        $scope.reviewsModal = {
            show: jasmine.createSpy('modal spy', ['hide'])
        };
        var $event = {};
        var reviews = [1, 2, 3];
        $scope.openReviewsModal($event, reviews);
        expect($scope.reviews).toEqual(reviews);
    });
    it('should define events with correct events', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock, $ionicModal: ionicModalMock
        });
        response.respond([{
            photos: [],
            leases: {
                '2016-04-01': [
                    {
                        'od': {
                            date: '2016-02-29 12:00:00'
                        },
                        'do': {
                            date: '2016-03-25 17:00:00'
                        }
                    }
                ]
            }
        }]);
        httpBackend.flush();
        expect($scope.events[0]).toEqual({
            start: new Date(2016, 2, 29),
            end: new Date(2016, 3, 25),
            stick: true
        })
    });
})