describe('ProfileCtrl', function () {

    var ctrl,
        profile,
        httpBackend,
        stateParams, rating;

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

    beforeEach(module(function ($provide) {
        $provide.factory('rating', function () {
            return {
                getFullStars: function (num) { },
                hasHalfStar: function (num) { },
                getEmptyStars: function (num) { }
            }
        });
    }));

    beforeEach(inject(function (_$controller_, _profile_, $httpBackend, _rating_) {
        ctrl = _$controller_;
        profile = _profile_;
        httpBackend = $httpBackend;
        stateParams = { profileId: 28 };
        rating = _rating_;
        httpBackend.whenGET('http://sp2.binarity-testing.cz/mobile/user/user-profile?userID=28').respond({
            'user': {
                'id': 28,
                'jmeno': 'Martin',
                'prijmeni': 'Žid'
            }
        });
    }));

    it('should set status variable to 0', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, rating: rating });
        expect($scope.status).toBe(3);
    });
    it('all rating function should be defined', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, rating: rating });
        expect(typeof $scope.getFullStars && typeof $scope.hasHalfStar && typeof $scope.getEmptyStars).toBe('function');
    });
    it('should set profile id to 28', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, rating: rating });
        expect($scope.id).toBe(28);
    });
    it('doRefresh should be defined', function () {
        var $scope = {};
        var controller = ctrl('ProfileCtrl', { $scope: $scope, $stateParams: stateParams, rating: rating });
        expect(typeof $scope.doRefresh).toBe('function');
    });
})