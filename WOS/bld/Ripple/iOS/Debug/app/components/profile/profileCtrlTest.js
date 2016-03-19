describe('ProfileCtrl', function () {

    var ctrl,
        profile,
        httpBackend,
        stateParams,
        ionicModalMock;

    beforeEach(module('wos.controllers.profile'));

    beforeEach(module(function ($provide) {
        $provide.factory('profile', function ($http) {
            return {
                getProfileData: function (id) {
                    return $http({
                        method: 'GET',
                        url: 'http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28'
                    });
                },
            }
        })
    }));

    beforeEach(inject(function (_$controller_, _profile_, $httpBackend, $q) {
        ctrl = _$controller_;
        profile = _profile_;
        httpBackend = $httpBackend;
        stateParams = { profileId: 28 };
        response = httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28');
        response.respond({ items: [] });
        //httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28').respond({
        //    'user': {
        //        'id': 28,
        //        'jmeno': 'Martin',
        //        'prijmeni': 'Žid'
        //    }
        //});
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise)
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.status).toBe(0);
    });
    it('should set profile id to 28', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.id).toBe(28);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
    it('should return object with correct content', function () {
        var $scope = {};
        response.respond({
            'id': 28,
            'jmeno': 'Martin',
            'prijmeni': 'Žid',
            items: [],
        });
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.id).toBe(28);
    });
    it('error should set status variable to 2', function () {
        var $scope = {};
        response.respond(500, '');
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        httpBackend.flush();
        expect($scope.status).toBe(2);
    });
})