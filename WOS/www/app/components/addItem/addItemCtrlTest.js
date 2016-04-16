describe('AddItem', function () {
    
    var ctrl,
        locality,
        category,
        item,
        httpBackend,
        categoryResponse,
        localityResponse,
        cordovaCameraMock,
        ionicHistoryMock,
        stateMock,
        ionicModalMock,
        cordovaTransferMock;

    beforeEach(module('wos.controllers.addItem'));
    beforeEach(module('wos.api'));
    beforeEach(module('wos.services.profile'))

    beforeEach(module(function ($provide) {
        $provide.factory('locality', function ($http) {
            return {
                getUserLocalities: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/locality?userID=' + id
                    });
                }
            }
        })
    }));

    beforeEach(module(function ($provide) {
        $provide.factory('category', function ($http) {
            return {
                getChildcategories: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz//add-item/returnchildcategories?data=' + id
                    });
                }
            }
        })
    }));

    beforeEach(module(function ($provide) {
        $provide.factory('item', function ($http) {
            return {
                getChildcaddItemategories: function (item) { }
            }
        })
    }));

    beforeEach(inject(function (_$controller_, _category_, _locality_, _item_, $httpBackend, $q) {
        ctrl = _$controller_;
        category = _category_;
        locality = _locality_;
        item = _item_;
        httpBackend = $httpBackend;
        categoryResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz//add-item/returnchildcategories?data=44');
        categoryResponse.respond([
             { "id": 1, "name": "Home", "foto": "house.jpg" },
             { "id": 2, "name": "Garden", "foto": "garden.jpg" }
        ]);
        localityResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/locality?userID=18');
        localityResponse.respond({});
        cordovaCameraMock = {
            getPicture: jasmine.createSpy('getPicture spy')
        };
        ionicHistoryMock = {
            backView: jasmine.createSpy('backView spy').and.returnValue({
                stateId: {
                    indexOf: function () { return true }
                }
            })
        },
        stateMock = jasmine.createSpy('$state spy', ['go']);
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise),
            close: jasmine.createSpy('modal spy'),
        };
        cordovaTransferMock = jasmine.createSpy('$cordovaFileTransfer spy');
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('should set status variable to 2', function () {
        var $scope = {};
        categoryResponse.respond(500, '');
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('server error, should set status variable to 2', function () {
        var $scope = {};
        localityResponse.respond(500, '');
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('server error, should set status variable to 2', function () {
        var $scope = {};
        categoryResponse.respond(500, '');
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('addPrice should add new price into prices array', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.price.period = 1;
        $scope.item= {
            price: 150
        };
        $scope.forms.addItemForm = {
            price: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            }
        };
        $scope.addPrice();
        expect($scope.prices.length).toBe(1);
    });
    it('addPrice should not add new price into prices array, when period is NaN and price is null', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.price.period = NaN;
        $scope.item = {
            price: null
        };
        $scope.forms.addItemForm = {
            price: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            }
        };
        $scope.addPrice();
        expect($scope.prices.length).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('addLocality should add locality to locality array', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.selectedLocality.value = 0;
        $scope.localities = [{ name: 'Liberec' }];
        $scope.addLocality();
        expect($scope.selectedLocalities.length).toBe(1);
    });
    it('addLocality should not add locality to locality array, when value is undefined', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.selectedLocality.value = undefined;
        $scope.localities = [{ name: 'Liberec' }];
        $scope.addLocality();
        expect($scope.selectedLocalities.length).toBe(0);
    });
    it('deleteLocality should delete locality from locality array from index location', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.selectedLocalities = [1, 2, 3];
        $scope.deleteLocality(1);
        expect($scope.selectedLocalities).toEqual([1, 3]);
    });
    it('saveNewLocality should save new locality to locality array and set undefined to all used variables', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.forms.newLocality = {
            street: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
            city: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
            postal_code: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
            from: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
            to: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
        };
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        var mockLocality = {
            city: 'Liberec',
            street: 'Holubova',
            postal_code: '244 23',
            days: []
        };
        $scope.saveNewLocality(mockLocality);
        expect($scope.selectedLocalities.length).toBe(1);
        expect($scope.forms.newLocality.street.$setUntouched).toHaveBeenCalled();
        expect($scope.forms.newLocality.city.$setUntouched).toHaveBeenCalled();
        expect($scope.forms.newLocality.postal_code.$setUntouched).toHaveBeenCalled();
        expect($scope.forms.newLocality.from.$setUntouched).toHaveBeenCalled();
        expect($scope.forms.newLocality.to.$setUntouched).toHaveBeenCalled();
    });
    it('addDay should add new day to days array', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.forms.newLocality = {
            from: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
            to: {
                $setUntouched: jasmine.createSpy('$setUntouched spy')
            },
        };
        $scope.locality = {
            from: new Date("October 13, 2014 11:13:00"),
            to: new Date("October 13, 2014 11:13:00"),
            day: 3,
            days: []
        };
        $scope.addDay();
        expect($scope.locality.days.length).toBe(1);
    });
    it('deleteDay should delete day from days array on given index', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item, 
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        $scope.locality = {
            days: [1, 2, 3]
        };
        $scope.deleteDay(1);
        expect($scope.locality.days).toEqual([1, 3]);
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        var controller = ctrl('AddItemCtrl', {
            $scope: $scope, $cordovaCamera: cordovaCameraMock, $ionicHistory: ionicHistoryMock,
            $state: stateMock, category, locality, $ionicModal: ionicModalMock, item,
            $cordovaFileTransfer: cordovaTransferMock
        });
        httpBackend.flush();
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });

})