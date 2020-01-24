/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * 
 */
angular.module('wb').controller( 'MainCtrl', function(
		/* Controller */ $scope, $element,
		/* AngularJS  */ $http, $templateCache, $templateRequest, $q, $window, $location,
		/* wb-core    */ $widget, $wbUtil,
		/* wb         */ $routeParams) {


	/*
	 * Preload template id
	 * 
	 * The controllers
	 */
	var TEMPLATE_KEY = 'view/wb-preload-template.html';

	/***********************************************************
	 * Content Meta data
	 ***********************************************************/

	var graphql = '{' +
	/* content */ 'id,name,title,description,mime_type,media_type,file_name,file_size,downloads,status,creation_dtime,modif_dtime,author_id' +
	/* metas */ ',metas{id,content_id,key,value}'+
//	/* terms */ ',term_taxonomies{id, taxonomy, term{id, name, metas{key,value}}}' +
	'}';
	var content;
	var contentMetas;
	var contentValue;

	function getContentMeta(newUrl){
		// XXX:
		var contentPath = convertUrlToContent(newUrl);
		if(!contentPath){
			throw {
				status: 404,
				code: 404,
				message: 'Path is not a valid URL'
			};
		}
		return $http({
			method: 'GET',
			url: contentPath,
			graphql: graphql
		})
		.then(function(res){
			return res.data;
		}, pushError);
	}

	function setContentMeta(contentMeta){
		content = contentMeta;
		contentMetas = contentMeta.metas;
		delete contentMeta.metas;
		delete contentMeta.term_taxonomies;
	}

	function loadTemplate(/*templateUrl*/){

	}

	function setContentType(/*contentMeta*/){
		// XXX:
	}

	function isWeburgerContent(){
		// XXX: 
		return true;
	}

	function loadContentValue(contentMeta){
		setContentType(contentMeta);
		if(isWeburgerContent()){
			return $templateRequest('/api/v2/cms/contents/'+contentMeta.id+'/content')
			.then(function(contentValueStr){
				contentValue = JSON.parse(contentValueStr);
				return $q.all([
					loadModules(contentValue.modules || []),
					loadTemplate(contentValue.template)
					])
					.then(function(){
						return renderContent();
					}, pushError);
			}, pushError);
		}
		// TODO: plan for other types of contents.
	}

	function convertUrlToContent(newUrl){
		var url = new URL(newUrl);
		var pathname = url.pathname;

		// get last part 
		var index = pathname.lastIndexOf('/');
		var fileName = pathname.substr(index+1);
		return '/api/v2/cms/contents/' + (fileName || 'app-amh-shop-fa');
	}

	function renderContent(){
		contentValue = $wbUtil.clean(contentValue);
		return $widget.compile(contentValue, null, $element)
		.then(function(){
			removePreloaderTemplate();
		});
	}

	/***********************************************************
	 * Modules
	 ***********************************************************/
	var loadedModel = {};

	function removeAllMarkedModules(){
		_.forEach(loadedModel, function(moduel){
			if(moduel.candidate && moduel.loaded) {
				// XXX; remove module
				if(moduel.type === 'css'){
					$window.removeLibrary(moduel.url);
					moduel.loaded = false;
				}
			}
		});
	}

	function markAllModule(){
		_.forEach(loadedModel, function(moduel){
			moduel.candidate = true;
		});
	}

	function loadModules(modules){
		var jobs = [];
		var lazyJobs = [];

		_.forEach(modules, function(module){
			if(loadedModel[module.url]){
				loadedModel[module.url].candidate = false;
				return;
			}
			var job;
			switch(module.type){
			case 'js':
				job = $window.loadLibrary(module.url);
				break;
			case 'css':
				job = $window.loadStyle(module.url);
				break;
			}
			if(job){
				loadedModel[module.url] = module;
				module.candidate = false;
				module.loaded = true;
				job.then(function(){
					module.state = 'success';
				}, function(error){
					module.state = 'error';
					pushError(error);
				});
				if(module.load === 'before'){
					jobs.push(job);
				}else {
					lazyJobs.push(job);
				}
			}
		});
		return $q.all(jobs);
	}

	/***********************************************************
	 * Errors
	 ***********************************************************/
	var errors = [];
	var errorElement = null;

	function cleanErrors(){
		errors = [];
		removeErrorTemplate();
	}

	function pushError(){
		// XXX:
	}

	function loadErrorTemplate(){
		if(!errorElement){
			return;
		}
		errorElement.remove();
		errorElement = null;
	}

	function removeErrorTemplate(){
		// XXX:
	}

	function isAnyError(){
		return !_.isEmpty(errors);
	}

	/***********************************************************
	 * Preload
	 ***********************************************************/
	var preLoadTemplateLoaded = true;
	var preLoadTemplate;
	/*
	 * Converts all children of the body into a template and save into
	 * the template cache.
	 * 
	 * The template will be used in page switch.
	 */
	function createPreloaderTemplate(){
		var template = $element.html();
		$templateCache.put(TEMPLATE_KEY, template);
	}

	/*
	 * Load preload template into the element
	 */
	function loadPreloaderTemplate(){
		if(preLoadTemplateLoaded){
			return;
		}
		return $templateRequest(TEMPLATE_KEY)
		.then(function(template){
			preLoadTemplateLoaded = true;
			preLoadTemplate = angular.element( template );
			$element.wrap('<body></body>');
			$element.parent().append(preLoadTemplate);
			_.assign($element.parent()[0].style, $element[0].style);
		}, pushError);
	}


	function removePreloaderTemplate(){
		if(!preLoadTemplateLoaded){
			return;
		}
		preLoadTemplateLoaded = false;
		if(preLoadTemplate){
			preLoadTemplate.remove();
			$element.unwrap();
		}
	}

	/***********************************************************
	 * Main
	 * 
	 * This is our main algorithem to switch into the new page.
	 * If the page URL changed then it load new data and update
	 * the view. See DOC for more information about the process.
	 ***********************************************************/
	function documentPathChanged(newUrl, oldUrl){
		// update $routeParams
		_.forEach($routeParams, function(value, key) {
			$routeParams[key] = null;
		});
		_.forEach($location.search(), function(value, key) {
			$routeParams[key] = value;
		});

		// run the algorithem
		markAllModule();
		cleanErrors();
		loadPreloaderTemplate();

		return getContentMeta(newUrl, oldUrl)
		.then(function(contentMeta){
			return $q.all([
				setContentMeta(contentMeta),
				loadContentValue(contentMeta)
				]);
		}, function(error){
			pushError(error);
		})
		.finally(function(){
			removeAllMarkedModules();
			if(isAnyError()){
				loadErrorTemplate();
			}
		});
	}

	// init controller
	createPreloaderTemplate();
	$scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl){
		documentPathChanged(newUrl, oldUrl);
	});
});
