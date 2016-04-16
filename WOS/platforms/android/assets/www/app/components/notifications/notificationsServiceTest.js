'use strict';

describe('Notifications service', function () {
    var notificationsService,
        httpBackend;

    beforeEach(module('wos.services.notifications'));
    beforeEach(module('wos.api'));

    beforeEach(inject(function (_notifications_, $httpBackend) {
        notificationsService = _notifications_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should FAIL!', function () {
        var userId = 18;
        var code = 'asdfasdf';
        var response;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/notifications?userID=18&code=asdfasdf').respond(200, '');
        notificationsService.getAll(userId, code).success(function (data) {
            response = true;
        });
        httpBackend.flush();
        expect(response).toBe(true);
    })

})