describe('SearchCtrl', function () {

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
                        url: 'http://sp2.binarity-testing.cz/mobile/item?search=' + query
                    });
                }
            }
        })
    }));

    beforeEach(inject(function (_$controller_, item, $httpBackend) {
        ctrl = _$controller_;
        $item = item;
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?search=sekacka');
        response.respond([]);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

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
    it('should set status variable to 0, after recieving data from server', function () {
        var $scope = {};
        response.respond([{
            name: 'Sekacka',
            itemState: 2
        }]);
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        $scope.searchText.value = 'sekacka';
        $scope.search();
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('should set status variable to 2, after server error', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        $scope.searchText.value = 'sekacka';
        $scope.search();
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('should set status variable to 1, when no data is returned', function () {
        var $scope = {};
        response.respond([]);
        var controller = ctrl('SearchCtrl', { $scope: $scope, item: $item });
        $scope.searchText.value = 'sekacka';
        $scope.search();
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
})