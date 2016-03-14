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
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28').respond({
            'user': {
                'id': 28,
                'jmeno': 'Martin',
                'prijmeni': 'Žid'
            }
        });
        ionicModalMock = {
            fromTemplateUrl: jasmine.createSpy('modal spy')
                             .and.returnValue($q.defer().promise)
        };
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        expect($scope.status).toBe(3);
    });
    it('should set profile id to 28', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        expect($scope.id).toBe(28);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        expect(typeof $scope.doRefresh).toBe('function');
    });
    it('ionic modal should be created', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, $ionicModal: ionicModalMock });
        expect(ionicModalMock.fromTemplateUrl).toHaveBeenCalled();
    });
})