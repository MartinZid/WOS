module.exports = function(config){
    config.set({
        basePath: '../',
        preprocessors: {
            'www/app/shared/item/itemView.html': ['ng-html2js']
        },

        files : [
            'www/assets/lib/ionic/js/ionic.bundle.min.js',
            'www/assets/lib/angular-mocks/angular-mocks.js',
            'www/app/shared/item/*.js',
            'www/app/components/API/*js',
            'www/app/shared/item/itemView.html',
            //'www/app/components/homepage/*js',
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