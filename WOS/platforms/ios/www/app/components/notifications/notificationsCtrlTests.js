describe('NotificationsCtrl', function () {

    var ctrl,
        $item,
        httpBackend;

    beforeEach(module('wos.controllers.notifications'));

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
        var controller = ctrl('NotificationsCtrl', { $scope: $scope});
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope});
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set data.showDelete to false', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        expect($scope.data.showDelete).toBe(false);
    });
    it('delete notification function should be defined', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        expect(typeof $scope.deleteItem).toBe('function');
    })
})