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
        cartService,
        ionicHistoryMock;

    beforeEach(module('wos.controllers.order'));
    beforeEach(module('wos.services.item'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.services.locality'));
    beforeEach(module('wos.services.cart'));
    beforeEach(module('wos.api'));
    beforeEach(module('ionic-datepicker'));

    beforeEach(module('pascalprecht.translate'));

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
        ionicHistoryMock = {
            backView: jasmine.createSpy('backView spy').and.returnValue({
                stateId: {
                    indexOf: function () { return true }
                }
            })
        }
        controller = ctrl('OrderCtrl', {
            $scope: $scope, $stateParams: stateParams,
            $state: stateMock, $ionicHistory: ionicHistoryMock
        });
        $scope.getItemDetail(stateParams.itemId);
        $scope.getUserLocality();
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //describe('testing status variable', function () {

    //    it('should set status to 0, when there is no server error', function () {
    //        var data = [{
    //            id: 1,
    //            name: 'Sekacka',
    //            leases: []
    //        }];
    //        itemResponse.respond(data);
    //        httpBackend.flush();
    //        expect($scope.status).toBe(0);
    //    })
    //    it('should set status to 2, when server error occured', function () {
    //        itemResponse.respond(500, '');
    //        localityResponse.respond(500, '');
    //        httpBackend.flush();
    //        expect($scope.status).toBe(2);
    //    })
    //});

    describe('testing correct content of variables', function () {

        beforeEach(function () {
            var data = [{
                id: 1,
                name: 'Sekacka',
                leases: []
            }];
            itemResponse.respond(data);
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

        beforeEach(function () {
            var data = [{
                id: 1,
                name: 'Sekacka',
                leases: []
            }];
            itemResponse.respond(data);
        })

        it('should set item to server response data', function () {
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
            $scope.from.time = new Date();
            $scope.to.time = new Date();
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

    describe('testing order functions', function () {

        beforeEach(function () {
            var data = [{
                id: 1,
                name: 'Sekacka',
                leases: 
                    {
                        '2016-04-17': {}
                    }
                
            }];
            itemResponse.respond(data);
            httpBackend.flush();
        })

        it('should define defineDatePickerObj functions', function () {
            expect(typeof $scope.defineDatePickerObjFrom).toBe('function');
            expect(typeof $scope.defineDatePickerObjTo).toBe('function');
        })

        it('createDisabledDates function should set correct dates as disabled', function () {
            $scope.createDisabledDates();
            expect($scope.disabledDates[0].getTime()).toEqual(new Date(2016, 3, 17).getTime());
        })

        it('createDisabledWeekdays function should set correct days as disabled', function () {
            $scope.item.availability = {
                1: {
                    '0': '',
                    '4': '',
                    '6': '',
                    'Praha': ''
                }
            };
            $scope.createDisabledWeekdays();
            expect($scope.disableWeekdays).toEqual([2, 3, 4, 6]);
        })
        it('isValid should set valid variable to false, when selected date overlaps with any lease', function () {
            $scope.from.date = new Date(2016, 3, 15);
            $scope.to.date = new Date(2016, 3, 25);
            $scope.isValid();
            expect($scope.valid).toBe(false);
        })
        it('isValid should set valid variable to true, when selected date does not overlap with any lease', function () {
            $scope.from.date = new Date(2016, 3, 15);
            $scope.to.date = new Date(2016, 3, 16);
            $scope.isValid();
            expect($scope.valid).toBe(true);
        })
        it('orderPrices should correctly ordered price by units', function () {
            var array = [
                {
                    'jednotka': 'měsíc'
                },
                {
                    'jednotka': 'hodina'
                },
                {
                    'jednotka': 'den'
                }
            ];
            array = $scope.orderPrices(array);
            expect(array).toEqual([
                {
                    'jednotka': 'hodina'
                },
                {
                    'jednotka': 'den'
                },
                {
                    'jednotka': 'měsíc'
                }
            ]);
        });
        it('countOrderPrice function should set finalPrice', function () {
            $scope.to.date = new Date(2016, 3, 25);
            $scope.from.date = new Date(2016, 3, 24);
            $scope.from.time = new Date(1970, 1, 1, 10);
            $scope.to.time = new Date(1970, 1, 1, 11);
            $scope.item.prices = [ 
                {
                    'jednotka': 'den',
                    'cena': '680'
                },
                {
                    'jednotka': 'hodina',
                    'cena': '130'
                }
            ]
            $scope.countOrderPrice();
            expect($scope.finalPrice).toBe(810);
        })
    })

    
})