describe('Tests for rating directive', function () {
    var $compile,
        $rootScope,
        rating,
        element;

    rating = 3.1;

    // Load the myApp module, which contains the directive
    beforeEach(module('wos.directives.rating'));
    beforeEach(module('my.templates'));

    beforeEach(module(function ($provide) {
        $provide.factory('rating', function () {
            return {
                getFullStars: function (num) { },
                hasHalfStar: function (num) { },
                getEmptyStars: function (num) { }
            }
        })
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.rating = rating;
        element = $compile('<stars_rating rating="rating"></stars-rating>')($rootScope);
        $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Compile a piece of HTML containing the directive
        expect(element.html()).toContain('<div ng-show="rating > -1">');
    });
});