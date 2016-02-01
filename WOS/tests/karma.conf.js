module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'www/lib/ionic/js/ionic.bundle.min.js',
      //'www/lib/ionic/js/angular/angular.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/controllers/**/*.js',
      'tests/unit/**/**/*.js'
      //'tests/unit/item/test.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};