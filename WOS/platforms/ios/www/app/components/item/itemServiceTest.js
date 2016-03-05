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

    it('getAll() should get correct data', function () {
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
            expect(data.data.data.sekacka.id).toEqual(28);
        });
        httpBackend.flush();
    });

    it('getDetail() should get correct data', function () {
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/item?itemID=28').respond({
            sekacka: {
                'id': 28,
                'jmeno': 'sekacka'
            }
        });
        itemService.getDetail(28).then(function (data) {
            console.log(data);
            expect(data.sekacka.jmeno).toBe('sekacka');
        })
    });
})