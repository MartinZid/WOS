describe('RegistrationCtrl', function () {

    var ctrl,
        stateMock;

    beforeEach(module('wos.controllers.registration'));


    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_;
        stateMock = stateMock = jasmine.createSpyObj('$state spy', ['go']);
    }));

    it('registration should be defined', function () {
        var $scope = {};
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock});
        expect(typeof $scope.registration).toBe('function');
    });
    it('', function () {
        var $scope = {};
        var controller = ctrl('RegistrationCtrl', { $scope: $scope, $state: stateMock });
        var user = {
            name: 'Martin'
        };
        $scope.registration(user);
        expect(stateMock.go).toHaveBeenCalledWith('tab.login');
    });
})