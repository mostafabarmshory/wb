'use strict';

var bowerJson = require('./../bower.json');
var cdnDb = {
	jquery: {
		versions: ['3.5.1'],
		url: function(version) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/jquery@' + version + '/dist/jquery.min.js';
		}
	},
	lodash: {
		versions: ['4.17.15'],
		url: function(version) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/lodash@' + version + '/lodash.min.js';
		}
	},
	flux: {
		versions: ['3.1.3'],
		url: function(version) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/flux@' + version + '/Flux.min.js';
		}
	},
	'mustache.js': {
		versions: ['2.3.2'],
		url: function(version) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/mustache.js@' + version + '/mustache.min.js';
		}
	},
	angular: {
		versions: ['1.7.9'],
		url: function(version) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/angular@' + version + '/angular.min.js';
		}
	},
	'am-wb-core': {
		versions: ['4.1.7'],
		url: function(version, resourcePath) {
			return '//cdn.viraweb123.ir/api/v2/cdn/libs/am-wb-core@' + version + '/' + resourcePath.join('/');
		}
	}
};


function convertModuleResource(module, resourcePath) {
	//>> XXX: extract version
	var version = 'latest';

	var config = cdnDb[module];
	version = config.versions.pop();
	return config.url(version, resourcePath);
}


module.exports = function(url) {
	if (url.indexOf('bower_components/')) {
		return url;
	}
	var newUrl = url;

	// TODO:
	//>> Check if url is a module
	var pthItems = url.split('/');
	pthItems.shift(); // Remove first part (bower_component)
	var moduleName = pthItems.shift();
	if (bowerJson.dependencies[moduleName]) {
		newUrl = convertModuleResource(moduleName, pthItems);
	}
	console.log('CDNIFY ' + url + ' -> ' + newUrl);
	return newUrl;
};
