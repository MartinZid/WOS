describe('AccountCtrl', function () {

    var ctrl,
        httpBackend,
        stateMock;

    beforeEach(module('wos.controllers.account'));

    //beforeEach(module(function ($provide) {
    //    $provide.factory('item', function ($http) {
    //        return {
    //            getAll: function () {
    //                return $http({
    //                    method: 'GET',
    //                    url: 'http://sp2.binarity-testing.cz/mobile/item'
    //                });
    //            },
    //            getDetail: function (id) { }
    //        }
    //    })
    //}));

    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_;
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        //$item = item;
        //httpBackend = $httpBackend;
        //httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item').respond({
        //    data: {
        //        'sekacka': {
        //            'id': 28,
        //            'jmeno': 'sekacka'
        //        },
        //        'bagr': {
        //            'id': 12,
        //            'jmeno': 'bagr'
        //        }
        //    }
        //});
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set selectedSection variable to 1', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        expect($scope.selectedSection).toBe(1);
    });
})