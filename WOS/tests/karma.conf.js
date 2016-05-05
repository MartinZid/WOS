module.exports = function(config){
    config.set({
        basePath: '../',
        preprocessors: {
            'www/app/shared/item/itemView.html': ['ng-html2js'],
            'www/app/shared/errorMessage/errorMessageView.html': ['ng-html2js'],
            'www/app/shared/rating/ratingView.html': ['ng-html2js']
        },

        files : [
            'www/assets/lib/ionic/js/ionic.bundle.min.js',
            'www/assets/lib/angular-mocks/angular-mocks.js',
            'www/assets/lib/bower_components/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
            'www/assets/lib/bower-angular-translate/angular-translate.min.js',
            'www/app/shared/item/*.js',
            'www/app/components/API/*js',
            'www/app/shared/item/itemView.html',
            'www/app/shared/errorMessage/errorMessageView.html',
            'www/app/components/homepage/*js',
            'www/app/components/rating/*.js',
            'www/app/components/item/*.js',
            'www/app/shared/errorMessage/*.js',
            'www/app/app.js',
            'www/app/components/profile/*.js',
            'www/app/components/notifications/*js',
            'www/app/components/cart/*.js',
            'www/app/shared/rating/*js',
            'www/app/shared/rating/ratingView.html',
            'www/app/components/account/*.js',
            'www/app/components/login/*.js',
            'www/app/components/registration/*.js',
            'www/app/components/search/*.js',
            'www/app/components/category/*.js',
            'www/app/components/locality/*.js',
            'www/app/components/addItem/*.js',
            'www/app/components/rent/*js',
            'www/app/components/order/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        //browserNoActivityTimeout: 100000,

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'www/',
            moduleName: "my.templates"
        }
    });
};