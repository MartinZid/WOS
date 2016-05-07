describe('CartCtrl', function () {

    var ctrl,
        stateMock,
        cart;

    beforeEach(module('wos.controllers.cart'));
    beforeEach(module('wos.services.cart'));
    beforeEach(module('wos.api'));
    beforeEach(module('wos.services.profile'));

    beforeEach(inject(function (_$controller_, _cart_) {
        ctrl = _$controller_;
        stateMock = jasmine.createSpy('$state spy', ['go']);
        cart = _cart_;
        cart.clearCart();
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
    it('delete item function should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect(typeof $scope.deleteItem).toBe('function');
    });
    it('should set deletedItem when deleteItem function is called', function () {
        var $scope = {};
        $scope.$on = function () { };
        var order = { 
            from: {
                date: '2016-05-06T14:55:27.050Z',
                time: '2016-05-06T14:55:27.050Z'
            },
            to: {
                date: '2016-05-06T14:55:27.050Z',
                time: '2016-05-06T14:55:27.050Z'
            }
        };
        cart.addToCart(order);
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        $scope.deleteItem(0);
        expect($scope.deletedItem.from.time).toEqual(order.from.time);
    });
    it('countPrice function should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('CartCtrl', { $scope: $scope, $state: stateMock });
        expect(typeof $scope.countPrice).toBe('function');
    });
})