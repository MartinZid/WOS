describe('AccountCtrl', function () {

    var ctrl,
        httpBackend,
        stateMock;

    beforeEach(module('wos.controllers.account'));

    beforeEach(module(function ($provide) {
        $provide.factory('profile', function ($http) {
            return {
                getProfileData: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=' + id
                    });
                }
            };
        })
    }));

    beforeEach(inject(function (_$controller_, $httpBackend) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=25');
        response.respond({});
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set selectedSection variable to 1', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        expect($scope.selectedSection).toBe(1);
    });
    it('should call $state go() to tab.login, when logout is handled', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        $scope.logout();
        expect(stateMock.go).toHaveBeenCalledWith('tab.login');
    });
    it('should return object with correct content', function () {
        var $scope = {};
        response.respond({
            'id': 28,
            'jmeno': 'Martin',
            'prijmeni': 'Žid'
        });
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        expect($scope.profile.id).toBe(28);
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('change section should change selectedSection', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock });
        httpBackend.flush();
        $scope.changeSection(2);
        expect($scope.selectedSection).toBe(2);
    });
})