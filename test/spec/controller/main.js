'use strict';

describe('MainCtrl', function() {

	// load the controller's module
	beforeEach(module('wb'));

//	var MyMainCtrl;
//	var scope;

	// Initialize the controller and a mock scope
//	beforeEach(inject(function($controller, $rootScope) {
//		scope = $rootScope.$new();
//		MyMainCtrl = $controller('MyMainCtrl', {
//			$scope : scope,
//			// place here mocked dependencies
//		});
//	}));

	it('should be defined', function() {
		var a = 'a';
		expect(angular.isDefined(a)).toBe(true);
	});
});
