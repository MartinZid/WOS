'use strict';

describe('rating factory test', function () {
    var rent,
        httpBackend;

    beforeEach(module('wos.services.rent'));
    beforeEach(module('wos.api'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));


    beforeEach(inject(function (_rent_, $httpBackend) {
        rent = _rent_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should GET mobile/rent?userID when getAll() is called', function () {
        var response;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/rent?userID=25').respond(200, '');
        rent.getAll(25).then(function (data) {
            response = data;
        })
        httpBackend.flush();
        expect(response.status).toBe(200);
    });
    it('should PUT /rent/approve?rentID when approve() is called', function () {
        var response;
        httpBackend.whenPUT('http://sp2.binarity-testing.cz/mobile/rent/approve?rentID=19').respond(200, '');
        rent.approve(19).then(function (data) {
            response = data;
        })
        httpBackend.flush();
        expect(response.status).toBe(200);
    });
    it('should PUT /rent/decline?rentID when decline() is called', function () {
        var response;
        httpBackend.whenPUT('http://sp2.binarity-testing.cz/mobile/rent/decline?rentID=19').respond(200, '');
        rent.decline(19).then(function (data) {
            response = data;
        })
        httpBackend.flush();
        expect(response.status).toBe(200);
    });
    it('should PUT /rent/return?rentID when return() is called', function () {
        var response;
        httpBackend.whenPUT('http://sp2.binarity-testing.cz/mobile/rent/return?rentID=19').respond(200, '');
        rent.return(19).then(function (data) {
            response = data;
        })
        httpBackend.flush();
        expect(response.status).toBe(200);
    });

})