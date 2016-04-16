'use strict';

describe('OrderCtrl', function () {

    var ctrl,
        $scope,
        httpBackend,
        stateParams,
        controller,
        stateMock,
        itemResponse,
        localityResponse,
        profile,
        cartService;

    beforeEach(module('wos.controllers.order'));
    beforeEach(module('wos.services.item'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.services.locality'));
    beforeEach(module('wos.services.cart'));
    beforeEach(module('wos.api'));

    beforeEach(inject(function (_$controller_, $httpBackend, _profile_, _cart_) {
        httpBackend = $httpBackend;
        stateParams = { itemId: 22 };
        ctrl = _$controller_;
        $scope = {};
        $scope.$on = function () { };
        cartService = _cart_;
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        profile = _profile_;
        profile.login({
            id_uzivatel: 25,
            mobilelogin: 'asdfasdf'
        });
        $scope.user = profile.getLoggedInUserData();
        itemResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=22');
        itemResponse.respond({});
        localityResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/locality?userID=25');
        localityResponse.respond({});
        controller = ctrl('OrderCtrl', {
            $scope: $scope, $stateParams: stateParams,
            $state: stateMock
        });
        $scope.getItemDetail(stateParams.itemId);
        $scope.getUserLocality();
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('testing status variable', function () {
        it('should set status to 0, when there is no server error', function () {
            httpBackend.flush();
            expect($scope.status).toBe(0);
        })
        it('should set status to 2, when server error occured', function () {
            itemResponse.respond(500, '');
            localityResponse.respond(500, '');
            httpBackend.flush();
            expect($scope.status).toBe(2);
        })
    });

    describe('testing correct content of variables', function () {

        beforeEach(function () {
            httpBackend.flush();
        });
        it('should set itemId according to stateParams', function () {
            expect($scope.itemId).toBe(22);
        })

        it('should set imgURL to api url', function () {
            expect($scope.imgURL).toBe('http://sp2.binarity-testing.cz/');
        })

        it('should set finalPrice to 0', function () {
            expect($scope.finalPrice).toBe(0);
        })

        it('should set user according to logged in user', function () {
            expect($scope.user.id).toBe(25)
        })
    });

    describe('testing retriving data from server', function () {
        it('should set item to server response data', function () {
            var data = [{
                id: 1,
                name: 'Sekacka'
            }];
            itemResponse.respond(data);
            httpBackend.flush();
            expect($scope.item.id).toEqual(1);
        })

        it('should set userLocality to server response data', function () {
            var locality = {
                id: 1,
                name: 'Praha'
            };
            localityResponse.respond(locality);
            httpBackend.flush();
            expect($scope.userLocality).toEqual(locality);
        })
    });

    describe('testing addToCart function', function () {

        beforeEach(function () {
            itemResponse.respond([{
                jmeno: 'Bagr'
            }]);
            httpBackend.flush();
        })

        it('should redirect user to cart', function () {
            $scope.addToCart();
            expect(stateMock.go).toHaveBeenCalledWith('tab.cart');
        });

        it('should save correct item', function () {
            cartService.clearCart();
            $scope.addToCart();
            expect(cartService.getAll()[0].item.name).toBe('Bagr');
        });

        it('should save correct takeOver option', function () {
            $scope.takeOverOption.value = 0;
            cartService.clearCart();
            $scope.addToCart();
            expect(cartService.getAll()[0].takeOver).toBe(0);
        })
    })
    
})