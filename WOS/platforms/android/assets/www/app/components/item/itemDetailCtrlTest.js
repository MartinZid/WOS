describe('ItemDetailCtrl', function () {

    var ctrl,
        $item,
        httpBackend,
        stateParams,
        ionicSlideBoxDelegateMock,
        ionicPopoverMock,
        response,
        ionicHistoryMock,
        stateMock;

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

    beforeEach(inject(function (_$controller_, item, $httpBackend, $q) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        stateParams = { itemId: 22 };
        ionicSlideBoxDelegateMock = jasmine.createSpyObj('$ionicSlideBoxDelegate spy', ['update']);
        ionicPopoverMock = {
            fromTemplateUrl: jasmine.createSpy('popover spy')
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
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=22');
        response.respond({});
    }));

    it('should set item id variable to 22', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock
        });
        expect($scope.id).toBe(22);
    });
    it('should set status variable to 3', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock
        });
        expect($scope.status).toBe(3);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock
        });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('ionic popover should be created', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('ItemDetailCtrl', {
            $scope: $scope, item: $item, $stateParams: stateParams,
            $ionicSlideBoxDelegate: ionicSlideBoxDelegateMock,
            $ionicPopover: ionicPopoverMock, $cordovaGeolocation: cordovaGeolocationMock,
            $ionicHistory: ionicHistoryMock, $state: stateMock
        });
        expect(ionicPopoverMock.fromTemplateUrl).toHaveBeenCalled();
    });
})