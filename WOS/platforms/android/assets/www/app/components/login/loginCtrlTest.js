describe('LoginCtrl', function () {

    var ctrl,
        ionicModalMock,
        stateMock;

    beforeEach(module('wos.controllers.login'));

    beforeEach(module(function ($provide) {
        $provide.factory('profile', function ($http) {
            return {
                forgottenPassword: function (email) {
                    return $http({
                        method: 'PUT',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/forgotten-password/defaul?email=' + email
                    })
                }
            };
        })
    }));

    beforeEach(inject(function (_$controller_, $q, $httpBackend) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        response = httpBackend.whenPUT('http://sp2.binarity-testing.cz/mobile/user/forgotten-password/defaul?email=zidmarti@fit.cvut.cz');
        response.respond(200, '');
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise),
            close: jasmine.createSpy('modal spy')
        };
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('login should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        expect(typeof $scope.login).toBe('function');
    });

    it('forgottenPassword should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        expect(typeof $scope.forgottenPassword).toBe('function');
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('forgottenPassword should close modal', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.modal.hide).toHaveBeenCalled();
    });
    it('should call $state go() to tab.home, when login is successful', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.login();
        expect(stateMock.go).toHaveBeenCalledWith('tab.home');
    });
    it('successful forgottenPassword set status to 0', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('failed forgottenPassword set status to 2', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('failed forgottenPassword set email to given email', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.email).toBe('zidmarti@fit.cvut.cz');
    });
})