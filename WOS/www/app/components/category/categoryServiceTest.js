'use strict';

describe('Category service', function () {
    var categoryService,
        httpBackend;

    beforeEach(module('wos.services.category'));
    beforeEach(module('wos.api'));

    beforeEach(module(function ($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));

    beforeEach(inject(function (_category_, $httpBackend) {
        categoryService = _category_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('getChildcategories() should get correct data', function () {
        var categories;
        httpBackend.whenGET('http://sp2.binarity-testing.cz//add-item/returnchildcategories?data=44').respond([
            {
                'name': 'Zahradni nabytek',
                'id': 1
            },
            {
                'name': 'Naradi',
                'id': 2
            }
        ]);
        categoryService.getChildcategories(44).then(function (data) {
            categories = data.data;
        });
        httpBackend.flush();
        expect(categories.length).toEqual(2);
    });
})