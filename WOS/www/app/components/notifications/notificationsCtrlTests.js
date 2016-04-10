describe('NotificationsCtrl', function () {

    var ctrl,
        $item,
        httpBackend,
        response,
        stateMock;

    beforeEach(module('wos.controllers.notifications'));
    beforeEach(module('wos.services.notifications'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.api'));

    beforeEach(inject(function (_$controller_, $httpBackend, _profile_) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/notifications?userID=25&code=asdfasdf');
        response.respond([]);
        stateMock = jasmine.createSpy('$state spy', ['go']);
        profile = _profile_;
        profile.login({
            id_uzivatel: 25,
            mobilelogin: 'asdfasdf'
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    function beforeEnter(scope) {
        scope.user = profile.getLoggedInUserData();
        scope.getAllNotifications();
    }

    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond([{
            'id': 275,
            'link_param': '28',
            'vytvoreno': {
                'date': '2016-03-08 19:34:10'
            },
            'obsah': "user.notifications.item_added_into_cart"
        }]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set data.showDelete to false', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.data.showDelete).toBe(false);
    });
    it('delete notification function should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect(typeof $scope.deleteItem).toBe('function');
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond(500, '');
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('should set status to 1, if there are no notifications', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond([]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
    it('should define notifications atributes (myDate and type)', function () {
        var $scope = {};
        $scope.$on = function () { };
        response.respond([{
            'id': 275,
            'link_param': '28',
            'vytvoreno': {
                'date': '2016-03-08 19:34:10'
            },
            'obsah': "user.notifications.item_added_into_cart"
        }]);
        var controller = ctrl('NotificationsCtrl', { $scope: $scope, $state: stateMock });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.items[0].myDate && $scope.items[0].type).not.toBe('undefined');
    });
})