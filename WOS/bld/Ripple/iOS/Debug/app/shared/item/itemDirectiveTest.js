describe('Tests for item directive', function () {
    var $compile,
        $rootScope,
        item,
        element;

    item = {
        jmeno_fotky: '5689920de2b02.jpg',
        nazev: 'Joh Deere 1023E',
        rating: '4.3',
        locality_html: 'Praha',
        price_html: 'od 680 Kč/den'
    };

    // Load the myApp module, which contains the directive
    beforeEach(module('wos.directives'));
    beforeEach(module('my.templates'));
    beforeEach(module('wos.api'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $templateCache) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.item = item;
        element = $compile('<wos-item name="item"></wos-item>')($rootScope);
        $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        // Compile a piece of HTML containing the directive
        expect(element.html()).toContain("Praha");
    });

    describe('Tests for item directive method hasHalfStar', function () {
        it('Should have a half star with rating 4.3', function () {
            expect($rootScope.hasHalfStar(4.3)).toBe(true);
        });
        it('Should not have a half star with rating 4.2', function () {
            expect($rootScope.hasHalfStar(4.2)).toBe(false);
        });
        it('Should not have a half star with rating 4.7', function () {
            expect($rootScope.hasHalfStar(4.7)).toBe(false);
        });
    });

    describe('Tests for item directive method getFullStars', function () {
        it('Should return array of size 5 with rating 4.7', function () {
            expect($rootScope.getFullStars(4.7).length).toBe(5);
        });
        it('Should return array of size 5 with rating 4.2', function () {
            expect($rootScope.getFullStars(4.2).length).toBe(4);
        });
    });
    describe('Tests for item directive method getEmptyStars', function () {
        it('Should return array of size 3 with rating 2.2', function () {
            expect($rootScope.getEmptyStars(2.2).length).toBe(3);
        });
        it('Should return array of size 2 with rating 2.7', function () {
            expect($rootScope.getEmptyStars(2.7).length).toBe(2);
        });
        it('Should return array of size 2 with rating 2.5', function () {
            expect($rootScope.getEmptyStars(2.5).length).toBe(2);
        });
    });
});