describe('AccountCtrl', function () {

    var ctrl,
        httpBackend,
        stateMock,
        ionicModalMock,
        profileResponse,
        rentResponse;

    beforeEach(module('wos.controllers.account'));

    beforeEach(module(function ($provide) {
        $provide.factory('profile', function ($http) {
            return {
                getProfileData: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=' + id
                    });
                }
            };
        })
    }));

    beforeEach(module(function ($provide) {
        $provide.factory('rent', function ($http) {
            return {
                getAll: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/rent?userID=' + id
                    });
                }
            };
        })
    }));

    beforeEach(module(function ($provide) {
        $provide.factory('rating', function ($http) {
            return {
                rateLease: function (id, rating, text) {
                    return $http({
                        method: 'POST',
                        url: 'http://sp2.binarity-testing.cz/mobile/rent/rating?leaseID=' + id + '&rating=' + rating + '&text=' + text
                    })
                }
            };
        })
    }));

    beforeEach(inject(function (_$controller_, $httpBackend, $q) {
        ctrl = _$controller_;
        httpBackend = $httpBackend;
        profileResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=25');
        profileResponse.respond({});
        rentResponse = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/rent?userID=25');
        rentResponse.respond([
            [[],[]],[[],[]]
        ]);
        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise),
            close: jasmine.createSpy('modal spy')
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('should set selectedSection variable to 1', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.selectedSection).toBe(1);
    });
    it('should call $state go() to tab.login, when logout is handled', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        $scope.logout();
        expect(stateMock.go).toHaveBeenCalledWith('tab.login');
    });
    it('should return object with correct content', function () {
        var $scope = {};
        profileResponse.respond({
            'id': 28,
            'jmeno': 'Martin',
            'prijmeni': 'Žid'
        });
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.profile.id).toBe(28);
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        profileResponse.respond(500, '');
        rentResponse.respond(500, '');
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
    it('change section should change selectedSection', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        $scope.changeSection(2);
        expect($scope.selectedSection).toBe(2);
    });
    it('should define goToItem function', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        $scope.changeSection(2);
        expect(typeof $scope.goToItem).toBe('function');
    });
    it('should define ratingObj for rating directive', function () {
        var $scope = {};
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        $scope.changeSection(2);
        expect($scope.ratingsObject).not.toBe(undefined);
    });
    it('should close modal and send rating to server, when rating is submitted', function () {
        var $scope = {};
        httpBackend.whenPOST('http://sp2.binarity-testing.cz/mobile/rent/rating?leaseID=24&rating=4&text=text').respond(200, '');
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        var text = 'text';
        $scope.leaseId = 24;
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
        var controller = ctrl('AccountCtrl', { $scope: $scope, $state: stateMock, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
})