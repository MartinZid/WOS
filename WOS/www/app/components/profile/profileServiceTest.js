'use strict';

describe('Tests for profile service', function () {
    var profileService,
        httpBackend;

    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.api'));

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

    it('getProfileData() should get correct data', function () {
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28').respond({
            user: {
                'id': 28,
                'jmeno': 'Martin',
                'prijmeni': 'Žid'
            }
        });
        profileService.getProfileData(28).then(function (data) {
            console.log(data);
            expect(data.user.jmeno).toBe('Martin');
        })
    });
})