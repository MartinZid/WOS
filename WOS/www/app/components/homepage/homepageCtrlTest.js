describe('HomepageCtrl', function () {
    
    var ctrl,
        $item,
        httpBackend,
        response;

    beforeEach(module('wos.controllers.homepage'));

    beforeEach(module(function ($provide) {
        $provide.factory('item', function ($http) {
            return {
                getAll: function () {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/item'
                    });
                },
                getDetail: function (id) { }
            }
        })
    }));

    beforeEach(inject(function (_$controller_, item, $httpBackend) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item');
        response.respond({});
        ionicNavBarDelegateMock = {
            showBackButton: jasmine.createSpy('showBackButton spy')
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set navTitle to image', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect($scope.navTitle).toContain('<img class="title-image"');
    });
    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('Status should be 0, after receiving data from API', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond({data: {
                    'sekacka': {
                        'id': 28,
                        'jmeno': 'sekacka'
                    },
                    'bagr': {
                        'id': 12,
                        'jmeno': 'bagr'
                    }
                }});
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('should return array of size 2', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond({
            data: {
                'sekacka': {
                    'id': 28,
                    'jmeno': 'sekacka'
                },
                'bagr': {
                    'id': 12,
                    'jmeno': 'bagr'
                }
            }
        });
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect(Object.keys($scope.items.data).length).toBe(2);
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond(500, '');
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('no data should set status variable to 1', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond([]);
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item, $ionicNavBarDelegate: ionicNavBarDelegateMock });
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
})