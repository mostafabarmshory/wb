

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine',
      'detectBrowsers'
    ],

    detectBrowsers: {
    	enabled: true,
    	usePhantomJS: false,
    	preferHeadless: true
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/lodash/lodash.js',
      'bower_components/flux/dist/Flux.js',
      'bower_components/mustache.js/mustache.js',
      'bower_components/angular/angular.js',
      'bower_components/am-wb-core/dist/am-wb-core.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    
    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,


    // coverage reporter generates the coverage
    reporters: [
    	'progress', 
    	'coverage'
    ],
    
    // optionally, configure the reporter
    coverageReporter: {
    	dir : 'coverage/',
    	reporters: [{
    		type : 'lcovonly',
    		file : 'lcov.info'
    	},{
    		type: 'text-summary'
    	}]
    },

    preprocessors: {
      'src/scripts/**/*.js': ['coverage']
    },

    // Which plugins to enable
    plugins: [
    	'karma-jasmine',
    	'karma-coverage',
    	
        'karma-chrome-launcher',
        'karma-edge-launcher',
        'karma-firefox-launcher',
        'karma-ie-launcher',
        'karma-safari-launcher',
        'karma-safaritechpreview-launcher',
        'karma-opera-launcher',
        'karma-detect-browsers'
    ],

    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
