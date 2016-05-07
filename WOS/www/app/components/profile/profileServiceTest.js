'use strict';

describe('Profile service', function () {
    var profileService,
        httpBackend;

    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.api'));
    beforeEach(module('wos.services.cart'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));

    beforeEach(inject(function (_profile_, $httpBackend) {
        profileService = _profile_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('getProfileData() should get correct data', function () {
        var user;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28').respond({
            user: {
                'id': 28,
                'jmeno': 'Martin',
                'prijmeni': 'Žid'
            }
        });
        profileService.getProfileData(28).then(function (data) {
            user = data;
        });
        httpBackend.flush();
        expect(user.data.user.jmeno).toBe('Martin');
    });
    it('registerUser() should get correct data', function () {
        var response;
        httpBackend.whenPOST('http://sp2.binarity-testing.cz/mobile/registration/?name=Martin&surname=Zid&email=zidmarti@fit.cvut.cz&pass=123456').respond(true);
        profileService.registerUser('Martin', 'Zid', 'zidmarti@fit.cvut.cz', '123456').then(function (data) {
            response = data;
        });
        httpBackend.flush();
        expect(response.data).toBe(true);
    });
})