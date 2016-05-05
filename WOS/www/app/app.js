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
                       'wos.controllers.order',
                       'wos.services.item',
                       'wos.services.profile',
                       'wos.services.notifications',
                       'wos.services.category',
                       'wos.services.locality',
                       'wos.services.rent',
                       'wos.services.cart',
                       'wos.services.rating',
                       'wos.directives.item',
                       'wos.directives.errorMessage',
                       'wos.directives.rating',
                       'wos.api',
                       'ngIOS9UIWebViewPatch',
                       'ngCordova',
                       'pascalprecht.translate',
                       'ionic-ratings',
                       'ui.calendar',
                       'ionic-datepicker'])

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
        'not_logged_in': 'Nejste přihlášeni.',
        'try_again': 'Zkusit znovu',
        'pull_to_refresh': 'Stáhněte pro obnovení...',
        'errors': {
            'no_data': 'Zde budou všechny položky.',
            'server_error': 'V komunikaci se serverem došlo k chybě. :-(',
        },
        'search': {
            'search': 'Co hledáte?',
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
        'months': {
            'jan': 'Leden',
            'feb': 'Únor',
            'mar': 'Březen',
            'apr': 'Duben',
            'may': 'Květen',
            'june': 'Červen',
            'july': 'Červenec',
            'aug': 'Srpen',
            'sept': 'Září',
            'oct': 'Říjen',
            'nov': 'Listopad',
            'dec': 'Prosinec'
        },
        'availability': {
            'unavailable': 'Nedostupné',
            'address': 'Adresa',
            'availability': 'Dostupnost'
        },
        'item': {
            'localities': 'Lokality',
            'similar_items': 'Podobné nabídky',
            'availibility': 'Dostupnost',
            'reviews': 'Hodnocení',
            'show_all': 'Zobrazit vše'
        },
        'notifications': {
            'notifications': 'Upozornění',
            'no_data': 'Zatím nemáte žádná upozornění.',
            'your_item': 'Vaše položka',
            'was_added_into_cart': 'byla přidána do košíku',
            'new_rating': 'Nové hodnocení',
            'was_hidden': 'byla skryta',
            'was_approved': 'byla schválena',
            'was_deleted': 'byla smazána'
        },
        'cart': {
            'cart': 'Košík',
            'no_data': 'Váš košík je prázdný.',
            'edit': 'Upravit',
            'from': 'Od',
            'to': 'Do',
            'return_to_cart': 'Vrátit zpět',
            'recently_deleted': 'Možná chcete vrátit zpět?',
            'orderds_successfully_posted': 'Vaše objednávka byla úspěšně odeslána!',
            'doOrder': 'Objednat',
        },
        'profile': {
            'user_items': 'Nabízené položky',
            'my_profile': 'Můj profil',
            'my_items': 'Položky',
            'borrows': 'Vypůjčeno',
            'rents': 'Pronajato',
            'show_reviews': 'Zobrazit hodnocení',
            'reviews': 'Hodnocení',
            'message_for_user': 'Zpráva uživateli',
            'no_items': 'Zde budou Vaše položky.',
            'logout': 'Odhlášení',
            'do_logout': 'Odhlásit se',
            'make_sure_logout': 'Opravdu se chcete odhásit?',
            'leases': {
                'item': 'Položka',
                'from': 'Od',
                'to': 'Do',
                'from_user': 'Uživatelem',
                'to_user': 'Uživateli',
                'state': 'Stav',
                'no_borrows': 'Zde budou Vaše výpůjčky.',
                'returned': 'Vráceno',
                'waiting_for_approval': 'Čeká na schválení',
                'borrowed': 'Vypůjčeno',
                'refused': 'Zamítnuto',
                'do_rate': 'Hodnotit',
                'already_rated': 'Již ohodnoceno',
                'decline': 'Zamítnout',
                'approve': 'Schválit',
                'action_failed': 'Akce se nezdařila.',
                'do_return': 'Vrátit',
                'approve_lease': 'Schválení výpůjčky',
                'decline_lease': 'Zamítnutí výpůjčky',
                'return_lease': 'Vrácení výpůjčky',
                'make_sure_approve_lease': 'Opravdu chcete výpůjčku schválit?',
                'make_sure_decline_lease': 'Opravdu chcete výpůjčku zamítnout?',
                'make_sure_return_lease': 'Opravdu chcete výpůjčku nahlásit jako vrácenou?'
            },
            'rating_title': 'Hodnocení',
            'states': {
                'created': 'Neschváleno',
                'approved': 'Schváleno',
                'hidden': 'Skryto',
                'deleted': 'Smazano',
                'show': 'Vystaveno'
            }
        },
        'close': 'Zavřít',
        'delete': 'Smazat',
        'save': 'Uložit',
        'cancel': 'Zrušit',
        'registration': {
            'registration': 'Registrace',
            'name': 'Jméno',
            'surname': 'Příjmení',
            'Email': 'E-mail',
            'email': 'e-mail',
            'password': 'Heslo',
            'min_length': 'Heslo musí obsahovat alespoň 5 znaků!',
            'already_had_account': 'Máte již účet? Přihlašte se.',
            'register': 'Registrovat se',
            'already_registred': 'S tímto e-mailem je již spojen jiný účet.',
            'success': 'Registrace byla úspěšná, na Váš emailem Vám byl zaslán ověřovací odkaz.'
        },
        'form': {
            'is_required': 'je povinné',
            'is_required2': 'Neplatný',
            'is_required3': 'je povinný',
            'is_reguired4': 'je povinná',
            'wrong_price': 'musí být kladná',
            'too_small': 'Malá hodnota'
        },
        'login': {
            'login': 'Přihlášení',
            'doLogin': 'Přihlásit se',
            'forgotten_password': 'Zapomenuté heslo?',
            'to_registration': 'Zaregistrujte se nyní',
            'reset_successful': 'Na e-mail Vám byl zaslán odkaz na resetování hesla.',
            'login_failed': 'Přihlašovací údaje nejsou správné. Zkuste to znovu.'
        },
        'forgotten_password': 'Zapomenuté heslo',
        'send_link': 'Odeslat odkaz k obnovení',
        'addItem': {
            'addItem': 'Nová položka',
            'new_photo': 'Přidat fotografii',
            'name_and_prices': 'Název a ceny',
            'name': 'Název',
            'price': 'Cena',
            'add_price': 'Přidat cenu',
            'category_select': 'Zvolení kategorie',
            'category': 'Kategorie',
            'sub_category': 'Podkategorie',
            'where_and_when': 'Kdy a kde půjčovat',
            'locality': 'Lokalita',
            'add_locality': 'Přidat lokalitu',
            'create_new_locality': 'Vytvořit novou lokalitu',
            'new_locality': 'Nová lokalita',
            'add_new_day': 'Nový den',
            'address': 'Adresa',
            'street': 'Ulice',
            'city': 'Město',
            'postal_code': 'Číslo popisné',
            'opening_hours': 'Otevírací doba',
            'opening_hours_info': 'Doba kdy je možné položku převzít/vrátit',
            'from': 'Od',
            'to': 'Do',
            'day': 'Den',
            'finish': 'Dokončit'
        },
        'hour': 'Hodina',
        'day': 'Den',
        'month': 'Měsíc',
        'week': 'Týden',
        'days_full': {
            'monday':'Pondělí',
            'tuesday':'Úterý',
            'wednesday':'Středa',
            'thursday':'Čtvrtek',
            'friday':'Pátek',
            'saturday':'Sobota',
            'sunday': 'Neděle',
        },
        'order': {
            'order': 'Objednávka',
            'item_take_over': 'Převzetí položky',
            'take_over_type': 'Způsob',
            'to_my_address': 'Doprava na uloženou adresu',
            'owners_address': 'Osobní odběr',
            'new_address': 'Doprava na novou adresu',
            'date': 'Termín',
            'datetime': 'Datum',
            'select_from': 'Zvolte si termín, od kdy si chcete položku vypůjčit.',
            'select_to': 'Zvolte si termín, do kdy si chcete položku vypůjčit.',
            'add_to_cart': 'Vložit do košíku',
            'date_too_low': 'Datum do musí být pozdější termín než datum od',
            'pick_date': 'Zvolte datum',
            'dates_overlap': 'Tento termín se překrývá s již rezervovaným termínem',
            'finish_editing': 'Dokončit úpravy'
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
    // needs to be disabled due to no cache view bug
    $ionicConfigProvider.views.swipeBackEnabled(false);

    //$ionicConfigProvider.tabs.position('bottom');
    //$ionicConfigProvider.navBar.alignTitle('center');

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
       cache: false,
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

   .state('tab.order', {
       url: '/cart/order/:itemId',
       views: {
           'cart': {
               templateUrl: 'app/components/order/orderView.html',
               controller: 'OrderCtrl'
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


   .state('tab.addItem', {
       url: '/account/addItem',
       views: {
           'account': {
               templateUrl: 'app/components/addItem/addItemView.html',
               controller: 'AddItemCtrl'
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
    $urlRouterProvider.otherwise('/tab/account');
    //$urlRouterProvider.otherwise('/tab/account/addItem');
    //$urlRouterProvider.otherwise('tab/home/order/24');
    //$urlRouterProvider.otherwise('tab/cart');
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
        inputDate: new Date(),
        setLabel: 'Nastavit',
        todayLabel: 'Dnes',
        closeLabel: 'Zrušit',
        mondayFirst: true,
        templateType: 'popup',
        showTodayButton: false,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
})
