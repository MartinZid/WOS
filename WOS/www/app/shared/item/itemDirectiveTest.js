describe('Tests for item directive', function () {
    var $compile,
        $rootScope,
        item,
        element,
        $state;

    item = {
        jmeno_fotky: '5689920de2b02.jpg',
        nazev: 'Joh Deere 1023E',
        rating: '4.3',
        locality_html: 'Praha',
        price_html: 'od 680 Kč/den'
    };

    // Load the myApp module, which contains the directive
    beforeEach(module('wos.directives.item'));
    beforeEach(module('my.templates'));
    beforeEach(module('wos.api'));
    beforeEach(module('wos.services.rating'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
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
});