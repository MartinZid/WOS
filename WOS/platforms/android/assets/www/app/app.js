'use strict';

var db;

angular.module('wos', ['ionic',
                       'wos.controllers.homepage',
                       'wos.controllers.search',
                       'wos.controllers.itemDetail',
                       'wos.controllers.profile',
                       'wos.controllers.notifications',
                       'wos.controllers.cart',
                       'wos.controllers.account',
                       'wos.controllers.registration',
                       'wos.controllers.login',
                       'wos.controllers.addItem',
                       'wos.services.item',
                       'wos.services.profile',
                       'wos.rating',
                       'wos.directives.item',
                       'wos.directives.errorMessage',
                       'wos.directives.rating',
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
            'user_items': 'Nabízené položky',
            'my_profile': 'Můj profil',
            'my_items': 'Položky',
            'borrows': 'Vypůjčeno',
            'rents': 'Pronajato',
            'show_reviews': 'Zobrazit hodnocení',
            'reviews': 'Hodnocení'
        },
        'close': 'Zavřít',
        'delete': 'Smazat',
        'registration': {
            'registration': 'Registrace',
            'name': 'Jméno',
            'surname': 'Příjmení',
            'Email': 'E-mail',
            'email': 'e-mail',
            'password': 'Heslo',
            'min_length': 'Heslo musí obsahovat alespoň 5 znaků!',
            'already_had_account': 'Máte již účet? Přihlašte se.',
            'register': 'Registrovat se'
        },
        'form': {
            'is_required': 'je povinné',
            'is_required2': 'Neplatný',
            'is_required3': 'je povinný',
            'is_reguired4': 'je povinná',
            'wrong_price': 'musí být kladná'
        },
        'login': {
            'login': 'Přihlášení',
            'doLogin': 'Přihlásit se',
            'forgotten_password': 'Zapomenuté heslo?',
            'to_registration': 'Zaregistrujte se nyní'
        },
        'forgotten_password': 'Zapomenuté heslo',
        'send_link': 'Odeslat odkaz k obnovení',
        'addItem': {
            'addItem': 'Nová položka',
            'new_photo': 'Přidat fotografii',
            'name_and_prices': 'Název a ceny',
            'name': 'Název',
            'price': 'Cena',
            'add_price': 'Přidat cenu'
        },
        'hour': 'Hodina',
        'day': 'Den',
        'month': 'Měsíc',
        'year': 'Rok',
        
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


   .state('tab.addItem', {
       url: '/home/addItem',
       views: {
           'homepage': {
               templateUrl: 'app/components/addItem/addItemView.html',
               controller: 'AddItemCtrl'
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
   })

   .state('tab.registration', {
       url: '/account/registration',
       views: {
           'account': {
               templateUrl: 'app/components/registration/registrationView.html',
               controller: 'RegistrationCtrl'
           }
       }
   })

   .state('tab.login', {
       url: '/account/login',
       views: {
           'account': {
               templateUrl: 'app/components/login/loginView.html',
               controller: 'LoginCtrl'
           }
       }
   });

  // if none of the above states are matched
   $urlRouterProvider.otherwise('/tab/home/addItem');
   //$urlRouterProvider.otherwise('tab/account/login');
   //$urlRouterProvider.otherwise('tab/account/registration');
});
