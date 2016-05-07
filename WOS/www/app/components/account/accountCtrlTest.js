describe('AccountCtrl', function () {

    var ctrl,
        httpBackend,
        stateMock,
        ionicModalMock,
        profileResponse,
        rentResponse,
        switcherProvideMock,
        profile;

    beforeEach(module('wos.controllers.account'));
    beforeEach(module('wos.services.profile'));
    beforeEach(module('wos.services.rent'));
    beforeEach(module('wos.services.rating'));
    beforeEach(module('wos.api'));
    beforeEach(module('ionic'));
    beforeEach(module('wos.services.cart'));

    beforeEach(inject(function (_$controller_, $httpBackend, $q, _profile_) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        profileResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=25');
        profileResponse.respond({});
        rentResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/rent?userID=25&code=asdfasdf');
        rentResponse.respond([
            [],[]
        ]);
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise),
            close: jasmine.createSpy('modal spy')
        };
        switcherProvideMock = jasmine.createSpy('$ionicViewSwitcher spy');
        profile = _profile_;
        profile.login({
            id_uzivatel: 25,
            mobilelogin: 'asdfasdf'
        });
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    function beforeEnter(scope) {
        scope.user = profile.getLoggedInUserData();
        scope.getUserData();
        scope.getUserRents();
    }

    it('should set status variable to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set selectedSection variable to 1', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.selectedSection).toBe(1);
    });
    it('should call $state go() to tab.login, when logout is handled', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        $scope.logout();
        expect(stateMock.go).toHaveBeenCalledWith('tab.login');
    });
    it('should return object with correct content', function () {
        var $scope = {};
        $scope.$on = function () { };
        profileResponse.respond({
            'id': 28,
            'jmeno': 'Martin',
            'prijmeni': 'Žid'
        });
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.profile.id).toBe(28);
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        $scope.$on = function () { };
        profileResponse.respond(500, '');
        rentResponse.respond(500, '');
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('change section should change selectedSection', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        $scope.changeSection(2);
        expect($scope.selectedSection).toBe(2);
    });
    it('should define goToItem function', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        $scope.changeSection(2);
        expect(typeof $scope.goToItem).toBe('function');
    });
    it('should define ratingObj for rating directive', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        $scope.changeSection(2);
        expect($scope.ratingsObject).not.toBe(undefined);
    });
    it('should close modal and send rating to server, when rating is submitted', function () {
        var $scope = {};
        $scope.$on = function () { };
        httpBackend.whenPOST('http://sp2.binarity-testing.cz/mobile/rent/rating?rentID=2&rating=4&text=text&instanceID=32&userID=25').respond(200, '');
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        var text = {
            value: 'text'
        };
        $scope.ratedLease = {
            id_vypujcka: 2,
            instance: {
                id_instance_original: 32
            }
        };
        $scope.rating = 4;
        $scope.doRate(text);
        $scope.modal = {
            hide: jasmine.createSpy('modal spy', ['hide'])
        };
        httpBackend.flush();
        expect($scope.modal.hide).toHaveBeenCalled();
        expect($scope.status).toBe(0);
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('should set isBorrowsArray and isRentsArray to false, when borrows and rents are empty', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        expect($scope.isBorrowsArray && $scope.isRentsArray).toBe(false);
    });
    it('it should set actionError for every lease to 0', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        rentResponse.respond([
            [{
                leases: [
                    {
                        'od': {
                            date: '2016-02-29 17:11:00'
                        },
                        'do': {
                            date: '2016-03-29 17:11:00'
                        }
                    }
                ]
            }], []
        ]);
        httpBackend.flush();
        expect($scope.borrows[0].leases[0].actionError).toBe(0);
    });
    it('it should convert date to correct formar', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        rentResponse.respond([
            [{
                leases: [
                    {
                        'od': {
                            date: '2016-02-29 17:11:00'
                        },
                        'do': {
                            date: '2016-03-29 17:11:00'
                        }
                    }
                ]
            }], []
        ]);
        httpBackend.flush();
        expect($scope.borrows[0].leases[0].from).toBe('29.02.2016 17:11:00');
    });
    //it('should call $state.go with correct params, when goToItem is called', function () {
    //    var $scope = {};
    //    $scope.$on = function () { };
    //    var controller = ctrl('AccountCtrl', {
    //        $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
    //        $ionicViewSwitcher: switcherProvideMock
    //    });
    //    beforeEnter($scope);
    //    httpBackend.flush();
    //    $scope.goToItem(2);
    //    expect(stateMock.go).toHaveBeenCalledWith('tab.item-detail', { itemId: 2});
    //});
    it('when modal is opened with id, it should set leaseId to correct value', function () {
        var $scope = {};
        $scope.$on = function () { };
        var controller = ctrl('AccountCtrl', {
            $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock,
            $ionicViewSwitcher: switcherProvideMock
        });
        beforeEnter($scope);
        httpBackend.flush();
        $scope.modal = {
            show: jasmine.createSpy('modal spy', ['hide'])
        };
        var lease = {
            id_vypujcka: 2
        };
        $scope.openModal(lease);
        expect($scope.ratedLease.id_vypujcka).toBe(2);
    });
})