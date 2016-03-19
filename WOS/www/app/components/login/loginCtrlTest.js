describe('LoginCtrl', function () {

    var ctrl,
        ionicModalMock,
        stateMock;

    beforeEach(module('wos.controllers.login'));


    beforeEach(inject(function (_$controller_, $q) {
        ctrl = _$controller_;
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise),
            close: jasmine.createSpy('modal spy')
        };
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
    }));

    it('login should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        expect(typeof $scope.login).toBe('function');
    });

    it('forgotttenPassword should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        expect(typeof $scope.forgotttenPassword).toBe('function');
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
        //$scope.modal = jasmine.createSpy('modal spy', ['hide']);
        $scope.forgotttenPassword('martin.zid@gmail.com');
        expect($scope.modal.hide).toHaveBeenCalled();
    });
    it('should call $state go() to tab.home, when login is successful', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock, $state: stateMock });
        $scope.login();
        expect(stateMock.go).toHaveBeenCalledWith('tab.home');
    });
})