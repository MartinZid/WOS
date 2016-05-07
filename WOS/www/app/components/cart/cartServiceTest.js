'use strict';

describe('Cart service', function () {
    var cartService,
        httpBackend;

    beforeEach(module('wos.services.cart'));
    beforeEach(module('wos.api'));

    beforeEach(inject(function (_cart_, $httpBackend) {
        cartService = _cart_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('testing add to cart function', function () {
        it('should add order to localStorage cart[0], when cart is empty', function () {
            var order = {
                id: 1,
                data: 'some data'
            }
            cartService.clearCart();
            cartService.addToCart(order);
            expect(JSON.parse(localStorage.getItem("cart"))[0].id).toEqual(order.id);
        });
        it('should store both order and order2 in array (order2 in second position', function () {
            var order = {
                id: 1,
                data: 'some data'
            }
            var order2 = {
                id: 2,
                data: 'some more data'
            }
            cartService.clearCart();
            cartService.addToCart(order);
            cartService.addToCart(order2);
            expect(JSON.parse(localStorage.getItem("cart"))[0].id).toEqual(order.id);
            expect(JSON.parse(localStorage.getItem("cart"))[1].id).toEqual(order2.id);
        })
    });

    describe('testing clearCart function', function () {
        it('should set localStorage cart to null, when clearCart is called', function () {
            var order = {
                id: 1,
                data: 'some data'
            };
            cartService.addToCart(order);
            cartService.clearCart();
            expect(JSON.parse(localStorage.getItem("cart"))).toBe(null);
        });
    });

    describe('testing deleteFromCart function', function () {
        it('order2 should be on position [0], after deleting order from localStorage cart', function () {
            var order = {
                id: 1,
                data: 'some data'
            }
            var order2 = {
                id: 2,
                data: 'some more data'
            }
            cartService.clearCart();
            cartService.addToCart(order);
            cartService.addToCart(order2);
            cartService.deleteFromCart(0);
            expect(JSON.parse(localStorage.getItem("cart"))[0].id).toEqual(order2.id);
        })
    });

    describe('testing getAll function', function () {
        it('getAll should return array with correct content', function () {
            var order = {
                id: 1,
                data: 'some data'
            };
            cartService.clearCart();
            cartService.addToCart(order);
            expect(cartService.getAll()[0].id).toEqual(order.id);
            expect(typeof cartService.getAll()).toBe('object');
        });
        it('getAll should return empty array when localStorage is not defined', function () {
            cartService.clearCart();
            expect(cartService.getAll()).toEqual([ ]);
        });
    });

    describe('testing update lease functions', function () {
        var order,
            order2;

        beforeEach(function () {
            order = {
                id: 1,
                data: 'some data'
            }
            order2 = {
                id: 2,
                data: 'some more data'
            }
            cartService.clearCart();
            cartService.addToCart(order);
            cartService.addToCart(order2);
        })

        it('setUpdatedLease should delete updated lease from cart', function () {
            cartService.setUpdatedLease(1);
            expect(cartService.getAll()[0]).toEqual(order);
        })

        it('getUpdatedLease should return updated lease', function () {
            cartService.setUpdatedLease(1);
            var updatedLease = cartService.getUpdatedLease();
            expect(updatedLease[0]).toEqual(order2);
        })

        it('deleteUpdatedLease should delete updated lease', function () {
            cartService.setUpdatedLease(1);
            cartService.deleteUpdatedLease();
            var updatedLease = cartService.getUpdatedLease();
            expect(updatedLease).toBe(null);
        })
    });

    describe('testing delete lease functions', function () {
        var order,
            order2;

        beforeEach(function () {
            order = {
                id: 1,
                data: 'some data'
            }
            order2 = {
                id: 2,
                data: 'some more data'
            }
            cartService.clearCart();
            cartService.addToCart(order);
            cartService.addToCart(order2);
        })

        it('setDeletedLease should delete deleted lease from cart', function () {
            cartService.setDeletedLease(1);
            expect(cartService.getAll()[0]).toEqual(order);
        })

        it('getDeletedLease should return deleted lease', function () {
            cartService.setDeletedLease(order);
            var deletedLease = cartService.getDeletedLease();
            expect(deletedLease).toEqual(order);
        })

        it('deleteDeletdLease should delete deleted lease', function () {
            cartService.setDeletedLease(1);
            cartService.deleteDeletedLease();
            var deletedLease = cartService.getUpdatedLease();
            expect(deletedLease).toBe(null);
        })
    });

    describe('testing sendOrders function', function () {
        it('sendOrders should POST correct request and have success callback when responded with status 200', function () {
            var order = {
                id: 1,
                data: 'some data'
            };
            var response;
            httpBackend.whenPOST('http://sp2.binarity-testing.cz/mobile/rent/order?data={"id":1,"data":"some data"}').respond(200, '');
            cartService.sendOrders(order).success(function(data) {
                response = true;
            });
            httpBackend.flush();
            expect(response).toBe(true);
        });
    });

})