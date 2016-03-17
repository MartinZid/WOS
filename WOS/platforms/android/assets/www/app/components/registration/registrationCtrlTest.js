describe('RegistrationCtrl', function () {

    var ctrl;

    beforeEach(module('wos.controllers.registration'));


    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_;
    }));

    it('registration should be defined', function () {
        var $scope = {};
        var controller = ctrl('RegistrationCtrl', { $scope: $scope});
        expect(typeof $scope.registration).toBe('function');
    });
})