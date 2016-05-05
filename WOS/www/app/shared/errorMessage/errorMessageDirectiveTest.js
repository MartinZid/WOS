describe('Tests for error message directive', function () {
    var $compile,
        $rootScope,
        element,
        mockTranslateFilter;;

    // Load the myApp module, which contains the directive
    beforeEach(module('wos.directives.errorMessage'));
    beforeEach(module('my.templates'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('translateFilter', mockTranslateFilter);
        });

        mockTranslateFilter = function (value) {
            return value;
        };
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.reload = function () { };
        element = $compile('<error-message reload="doRefresh()" status="status"></error-message>')($rootScope);
        $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function () {
        $rootScope.status = 2;
        expect(element.html()).toContain('<div class="error-message">');
    });
});