describe('LoginCtrl', function () {

    var ctrl,
        ionicModalMock,
        stateMock,
        switcherProvideMock;

    beforeEach(module('wos.controllers.login'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.api'));

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
        switcherProvideMock = jasmine.createSpy('$ionicViewSwitcher spy');
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('login should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        expect(typeof $scope.login).toBe('function');
    });

    it('forgottenPassword should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        expect(typeof $scope.forgottenPassword).toBe('function');
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('forgottenPassword should close modal', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.modal.hide).toHaveBeenCalled();
    });
    it('should call $state go() to tab.home, when login is successful', function () {
        var $scope = {};
        $scope.$on = function () { };
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/login')
            .respond([{
                id_uzivatel: 18,
                mobilelogin: 'sadsg432wffwfqw;'
            }]);
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        var user = {
            email: 'martin.zid@gmail.com',
            password: '1234'
        }
        $scope.login(user);
        httpBackend.flush();
        expect(stateMock.go).toHaveBeenCalledWith('tab.account');
        expect($scope.status).toBe(4);
    });
    it('should set user, errorOrigin and status when login failed', function () {
        var $scope = {};
        $scope.$on = function () { };
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/login')
            .respond(500, '');
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        var user = {
            email: 'martin.zid@gmail.com',
            password: '1234'
        }
        $scope.login(user);
        httpBackend.flush();
        expect($scope.status).toBe(2);
        expect($scope.errorOrigin).toBe(1);
        expect($scope.user.email).toBe('martin.zid@gmail.com');
    });
    it('successful forgottenPassword set status to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
    it('failed forgottenPassword set status to 2', function () {
        var $scope = {};
        response.respond(500, '');
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
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
        $scope.$on = function () { };
        var controller = ctrl('LoginCtrl', {
            $scope: $scope, $ionicModal: ionicModalMock,
            $state: stateMock, $ionicViewSwitcher: switcherProvideMock
        });
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        $scope.forgottenPassword('zidmarti@fit.cvut.cz');
        httpBackend.flush();
        expect($scope.email).toBe('zidmarti@fit.cvut.cz');
    });
})