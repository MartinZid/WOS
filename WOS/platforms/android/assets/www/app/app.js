﻿'use strict';

var db;

angular.module('wos', ['ionic',
                       'wos.controllers.homepage',
                       'wos.controllers.search',
                       'wos.controllers.itemDetail',
                       'wos.controllers.profile',
                       'wos.controllers.notifications',
                       'wos.controllers.cart',
                       'wos.services.item',
                       'wos.services.profile',
                       'wos.rating',
                       'wos.directives.item',
                       'wos.directives.errorMessage',
                       'wos.api',
                       'ngIOS9UIWebViewPatch',
                       'ngCordova',
                       'pascalprecht.translate'])

.run(function ($ionicPlatform, $cordovaSQLite) {
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
    //db = $cordovaSQLite.openDB("my.db");
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
})

.config(['$translateProvider', function ($translateProvider) {
    /// <summary>
    /// In this function all translation are handled.
    /// </summary>
    /// <param name="$translateProvider" type="type"></param>
    $translateProvider.translations('cs',
    {
        'tabs': {
            'home': 'Domů',
            'notifications': 'Upozornění',
            'cart': 'Košík',
            'me': 'Já',
        },
        'errors': {
            'no_data': 'Zde budou všechny položky.',
            'server_error': 'V komunikaci se serverem došlo k chybě. :-(',
        },
        'search': {
            'search': 'Hledat',
            'no_data': 'Vašemu dotazu nedopovídají žádné položky.'
        },
        'days': {
            'mon': 'Po',
            'tue': 'Út',
            'wed': 'St',
            'thu': 'Čt',
            'fri': 'Pá',
            'sat': 'So',
            'sun': 'Ne'
        },
        'availability': {
            'unavailable': 'Nedostupné',
            'address': 'Adresa',
            'availability': 'Dostupnost'
        },
        'notifications': {
            'notifications': 'Upozornění',
            'no_data': 'Zatím nemáte žádná upozornění.'
        },
        'cart': {
            'cart': 'Košík',
            'no_data': 'Váš košík je zatím prázdný.',
            'edit': 'Upravit'
        },
        'profile': {
            'user_items': 'Nabízené položky'
        }
        
    });
    $translateProvider.preferredLanguage('cs');
    $translateProvider.useSanitizeValueStrategy('escape');
}])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /// <summary>
    /// Sets some visual attributes and creates router.
    /// </summary>
    /// <param name="$stateProvider" type="type"></param>
    /// <param name="$urlRouterProvider" type="type"></param>
    /// <param name="$ionicConfigProvider" type="type"></param>

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
            controller: 'NotificationsCtrl'
        }
      }
  })

  .state('tab.item-detail', {
      url: '/home/:itemId',
      views: {
          'homepage': {
            templateUrl: 'app/components/item/itemDetailView.html',
            controller: 'ItemDetailCtrl'
        }
      }
   })

  .state('tab.profile-detail', {
      url: '/home/profile/:profileId',
      views: {
          'homepage': {
              templateUrl: 'app/components/profile/profileView.html',
              controller: 'ProfileCtrl'
          }
      }
  })

  .state('tab.cart', {
      url: '/cart',
      views: {
          'cart': {
              templateUrl: 'app/components/cart/cartView.html',
              controller: 'CartCtrl'
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
