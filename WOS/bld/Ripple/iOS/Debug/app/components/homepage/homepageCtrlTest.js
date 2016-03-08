describe('HomepageCtrl', function () {
    
    var ctrl,
        $item,
        httpBackend;

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
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item').respond({
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
    }));

    it('should set navTitle to image', function () {
        var $scope = {};
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item });
        expect($scope.navTitle).toContain('<img class="title-image"');
    });
    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item });
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: $item });
        expect(typeof $scope.doRefresh).toBe('function');
    });
})