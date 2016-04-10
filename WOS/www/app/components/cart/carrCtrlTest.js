describe('CartCtrl', function () {

    var ctrl,
        stateMock;

    beforeEach(module('wos.controllers.cart'));
    beforeEach(module('wos.services.cart'));
    beforeEach(module('wos.api'));
    beforeEach(module('wos.services.profile'));

    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_;
        stateMock = jasmine.createSpy('$state spy', ['go']);
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect($scope.status).toBe(0);
    });
    it('should set data.showDelete to false', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect($scope.data.showDelete).toBe(false);
    });
    it('delete notification function should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect(typeof $scope.deleteItem).toBe('function');
    });
    it('countPrice function should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect(typeof $scope.countPrice).toBe('function');
    });
})