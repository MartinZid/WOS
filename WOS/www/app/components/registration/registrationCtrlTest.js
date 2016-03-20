describe('RegistrationCtrl', function () {

    var ctrl,
        stateMock,
        httpBackend,
        response,
        user;

    beforeEach(module('wos.controllers.registration'));

    beforeEach(module(function ($provide) {
        $provide.factory('profile', function ($http) {
            return {
                registerUser: function (name, surname, email, password) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/registration/default?name=' + name + '&surname=' + surname + '&email' + email + '&pass=' + password
                    })
                }
            };
        })
    }));

    beforeEach(inject(function (_$controller_, $httpBackend) {
        ctrl = _$controller_;
        stateMock = stateMock = jasmine.createSpyObj('$state spy', ['go']);
        httpBackend = $httpBackend;
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/registration/default?name=Martin&surname=Zid&emailzidmarti@fit.cvut.cz&pass=123456');
        response.respond({});
        user = {
            name: 'Martin',
            surname: 'Zid',
            email: 'zidmarti@fit.cvut.cz',
            password: '123456'
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('registration should be defined', function () {
        var $scope = {};
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock});
        expect(typeof $scope.registration).toBe('function');
    });
    it('should set status variable to 0, when registration was successful', function () {
        var $scope = {};
        response.respond('true');
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock });
        $scope.registration(user);
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('should set status variable to 1, when registration failed', function () {
        var $scope = {};
        response.respond('false');
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock });
        $scope.registration(user);
        httpBackend.flush();
        expect($scope.status).toBe(1);
    });
    it('should set status variable to 2, when there was server error', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock });
        $scope.registration(user);
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('should set $scope.user, if server error occurred', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock });
        $scope.registration(user);
        httpBackend.flush();
        expect($scope.user.name).toBe('Martin');
    });
})