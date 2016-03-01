'use strict';

angular.module('wos', ['ionic',
                       'wos.controllers',
                       'wos.controllers.search',
                       'wos.services',
                       'wos.directives',
                       'wos.api',
                       'ngIOS9UIWebViewPatch'])

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

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //remove text from back button
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.tabs.position('bottom');

   $stateProvider

  // abstract state
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/components/tabs/tabsView.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'homepage': {
          templateUrl: 'app/components/homepage/homepageView.html',
          controller: 'HomepageCtrl'
      }
    }
  })

  .state('tab.search', {
      url: '/home/search',
      views: {
          'homepage': {
              templateUrl: 'app/components/search/searchView.html',
              controller: 'SearchCtrl'
          }
      }
  })

  .state('tab.notifications', {
      url: '/notifications',
      views: {
          'notifications': {
            templateUrl: 'app/components/notifications/notificationsView.html',
            controller: 'ChatsCtrl'
        }
      }
  })

  .state('tab.item-detail', {
      url: '/home/:itemId',
      views: {
          'homepage': {
            templateUrl: 'app/components/item/detailView.html',
            controller: 'ChatDetailCtrl'
        }
      }
   })

  .state('tab.profile-detail', {
      url: '/home/profile/:profileId',
      views: {
          'homepage': {
              templateUrl: 'app/components/profile/profileView.html',
              controller: 'ChatDetailCtrl'
          }
      }
  })

  .state('tab.cart', {
      url: '/cart',
      views: {
          'cart': {
              templateUrl: 'app/components/cart/cartView.html',
              controller: 'AccountCtrl'
        }
      }
    })

  .state('tab.account', {
      url: '/account',
      views: {
          'account': {
              templateUrl: 'app/components/account/accountView.html',
              controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched
  $urlRouterProvider.otherwise('/tab/home');

});
