describe('CartCtrl', function () {

    var ctrl;

    beforeEach(module('wos.controllers.cart'));

    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_;
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('CartCtrl', { $scope: $scope });
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('CartCtrl', { $scope: $scope });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set data.showDelete to false', function () {
        var $scope = {};
        var controller = ctrl('CartCtrl', { $scope: $scope });
        expect($scope.data.showDelete).toBe(false);
    });
    it('delete notification function should be defined', function () {
        var $scope = {};
        var controller = ctrl('CartCtrl', { $scope: $scope });
        expect(typeof $scope.deleteItem).toBe('function');
    });
    it('countPrice function should be defined', function () {
        var $scope = {};
        var controller = ctrl('CartCtrl', { $scope: $scope });
        expect(typeof $scope.countPrice).toBe('function');
    });
})