describe('HomepageCtrl', function () {

    beforeEach(module('wos.controllers'));
    beforeEach(module('wos.services'));

    var ctrl,
        item;

    beforeEach(inject(function(_$controller_, item) {
        ctrl = _$controller_;
        item = item;
    }));

    it('should set navTitle to image', function () {
        var $scope = {};
        var controller = ctrl('HomepageCtrl', { $scope: $scope, item: item });
        expect($scope.navTitle).toContain('<img class="title-image"');
    });



})