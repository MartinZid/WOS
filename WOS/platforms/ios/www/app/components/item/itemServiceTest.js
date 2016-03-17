'use strict';

describe('Tests for item service', function () {
    var itemService,
        httpBackend;

    beforeEach(module('wos.services.item'));
    beforeEach(module('wos.api'));

    beforeEach(module(function($provide) {
        $provide.factory('api', function () {
            return {
                url: 'http://sp2.binarity-testing.cz/'
            }
        });
    }));

    beforeEach(inject(function (_item_, $httpBackend) {
        itemService = _item_;
        httpBackend = $httpBackend;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('getAll() should get correct data', function () {
        var id;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item').respond({
            data: {
                'sekacka': {
                    'id': 28,
                    'jmeno': 'sekacka'
                },
                'bagr': {
                    'id': 12,
                    'jmeno': 'bagr'
                }
            }
        });
        itemService.getAll().then(function (data) {
            id = data.data.data.sekacka.id;
        });
        httpBackend.flush();
        expect(id).toEqual(28);
    });

    it('getDetail() should get correct data', function () {
        var name;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=28').respond({
            sekacka: {
                'id': 28,
                'jmeno': 'sekacka'
            }
        });
        itemService.getDetail(28).then(function (data) {
            name = data.data.sekacka.jmeno;
        });
        httpBackend.flush();
        expect(name).toBe('sekacka');
    });

    it('search() should get correct data', function () {
        var name;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?search=sekacka').respond({
            sekacka: {
                'id': 28,
                'jmeno': 'sekacka'
            }
        });
        itemService.search('sekacka').then(function (data) {
            name = data.data.sekacka.jmeno;
        });
        httpBackend.flush();
        expect(name).toBe('sekacka');
    });
})