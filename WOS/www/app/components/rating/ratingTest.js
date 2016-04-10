'use strict';

describe('rating factory test', function () {
    var rating,
        httpBackend;

    beforeEach(module('wos.rating'));
    beforeEach(module('wos.api'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));


    beforeEach(inject(function (_rating_, $httpBackend) {
        rating = _rating_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Tests for rating factory method hasHalfStar', function () {
        it('Should have a half star with rating 4.3', function () {
            expect(rating.hasHalfStar(4.3)).toBe(true);
        });
        it('Should not have a half star with rating 4.2', function () {
            expect(rating.hasHalfStar(4.2)).toBe(false);
        });
        it('Should not have a half star with rating 4.7', function () {
            expect(rating.hasHalfStar(4.7)).toBe(false);
        });
    });
    describe('Tests for item directive method getFullStars', function () {
        it('Should return array of size 5 with rating 4.7', function () {
            expect(rating.getFullStars(4.7).length).toBe(5);
        });
        it('Should return array of size 5 with rating 4.2', function () {
            expect(rating.getFullStars(4.2).length).toBe(4);
        });
    });
    describe('Tests for item directive method getEmptyStars', function () {
        it('Should return array of size 3 with rating 2.2', function () {
            expect(rating.getEmptyStars(2.2).length).toBe(3);
        });
        it('Should return array of size 2 with rating 2.7', function () {
            expect(rating.getEmptyStars(2.7).length).toBe(2);
        });
        it('Should return array of size 2 with rating 2.5', function () {
            expect(rating.getEmptyStars(2.5).length).toBe(2);
        });
    });

    it('rateLease should post data to server', function () {
        var response;
        httpBackend.whenPOST('http://sp2.binarity-testing.cz/mobile/rent/rating?rentID=24&rating=4&text=text&instanceID=18&userID=32').respond(200, '');
        rating.rateLease(24, 4, 'text', 32, 18).then(function (data) {
            response = data;
        })
        httpBackend.flush();
        console.log(response);
        expect(response.status).toBe(200);
    });
       
})