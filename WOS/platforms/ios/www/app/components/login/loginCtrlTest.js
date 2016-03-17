describe('LoginCtrl', function () {

    var ctrl,
        ionicModalMock;

    beforeEach(module('wos.controllers.login'));


    beforeEach(inject(function (_$controller_, $q) {
        ctrl = _$controller_;
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise)
        };
    }));

    it('login should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock });
        expect(typeof $scope.login).toBe('function');
    });

    it('forgotttenPassword should be defined', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock });
        expect(typeof $scope.forgotttenPassword).toBe('function');
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        var controller = ctrl('LoginCtrl', { $scope: $scope, $ionicModal: ionicModalMock });
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
})