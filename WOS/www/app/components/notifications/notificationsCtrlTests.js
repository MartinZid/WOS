describe('NotificationsCtrl', function () {

    var ctrl,
        $item,
        httpBackend,
        response;

    beforeEach(module('wos.controllers.notifications'));

    beforeEach(module(function ($provide) {
        $provide.factory('notifications', function ($http) {
            return {
                getAll: function (userId) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/notifications?userID=' + userId
                    })
                }
            }
        })
    }));

    beforeEach(inject(function (_$controller_, $httpBackend) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/notifications?userID=18');
        response.respond([]);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set status variable to 0', function () {
        var $scope = {};
        response.respond([{
            'id': 275,
            'link_param': '28',
            'vytvoreno': {
                'date': '2016-03-08 19:34:10'
            },
            'obsah': "user.notifications.item_added_into_cart"
        }]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set data.showDelete to false', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect($scope.data.showDelete).toBe(false);
    });
    it('delete notification function should be defined', function () {
        var $scope = {};
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect(typeof $scope.deleteItem).toBe('function');
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('should set status to 1, if there are no notifications', function () {
        var $scope = {};
        response.respond([]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
    it('should define notifications atributes (myDate and type)', function () {
        var $scope = {};
        response.respond([{
            'id': 275,
            'link_param': '28',
            'vytvoreno': {
                'date': '2016-03-08 19:34:10'
            },
            'obsah': "user.notifications.item_added_into_cart"
        }]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope });
        httpBackend.flush();
        expect($scope.items[0].myDate && $scope.items[0].type).not.toBe('undefined');
    });
})