'use strict';

describe('Locality service', function () {
    var localityService,
        httpBackend;

    beforeEach(module('wos.services.locality'));
    beforeEach(module('wos.api'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));

    beforeEach(inject(function (_locality_, $httpBackend) {
        localityService = _locality_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('getUserLocalities() should get correct data', function () {
        var localities;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/locality?userID=18').respond([
            {
                'city': 'Liberec',
                'street': 'Holubova'
            },
            {
                'city': 'Liberec',
                'street': 'U Vleku'
            }
        ]);
        localityService.getUserLocalities(18).then(function (data) {
            localities = data.data;
        });
        httpBackend.flush();
        expect(localities.length).toEqual(2);
    });
})