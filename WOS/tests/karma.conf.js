module.exports = function(config){
    config.set({
        basePath: '../',
        preprocessors: {
            'www/app/shared/item/itemView.html': ['ng-html2js'],
            'www/app/shared/errorMessage/errorMessageView.html': ['ng-html2js']
        },

        files : [
            'www/assets/lib/ionic/js/ionic.bundle.min.js',
            'www/assets/lib/angular-mocks/angular-mocks.js',
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
            'www/app/components/cart/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

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