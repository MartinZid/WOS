'use strict';

describe('rating factory test', function () {
    var rating;

    beforeEach(module('wos.rating'));

    beforeEach(inject(function (_rating_) {
        rating = _rating_;
    }));

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

    
})