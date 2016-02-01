'use strict';

angular.module('wos', ['ionic',
                       'wos.controllers',
                       'wos.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $scope.API = 'http://sp2.binarity-testing.cz/api/';

  $stateProvider

  // abstract state
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "views/tabs.html"
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'homepage': {
          templateUrl: 'views/homepage/homepage.html',
          controller: 'HomepageCtrl'
      }
    }
  })

  .state('tab.notifications', {
      url: '/notifications',
      views: {
          'notifications': {
            templateUrl: 'views/notifications/notifications.html',
            controller: 'ChatsCtrl'
        }
      }
  })

  .state('tab.item-detail', {
      url: '/home/:itemId',
      views: {
          'homepage': {
            templateUrl: 'views/item/detail.html',
            controller: 'ChatDetailCtrl'
        }
      }
   })

  .state('tab.profile-detail', {
      url: '/home/profile/:profileId',
      views: {
          'homepage': {
              templateUrl: '/views/profile/profile.html',
              controller: 'ChatDetailCtrl'
          }
      }
  })

  .state('tab.cart', {
      url: '/cart',
      views: {
          'cart': {
              templateUrl: 'views/cart/cart.html',
              controller: 'AccountCtrl'
        }
      }
    })

  .state('tab.profile', {
      url: '/profile',
      views: {
          'profile': {
              templateUrl: 'views/profile/account.html',
              controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched
  $urlRouterProvider.otherwise('/tab/home');

});
