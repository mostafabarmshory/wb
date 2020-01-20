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
'use strict';

angular.module('wb')//
/**
 * 
 */
.controller( 'MainCtrl', function($scope, $element, $http, $widget, $wbUtil) {
	var loadedModel;

    function setModel(model){
    	loadedModel = $wbUtil.clean(model);
        $widget.compile(loadedModel, null, $element);
    }

    function setDocumentPath(path){
        return $http.get(path)
        .then(function(res) {
            return setModel(res.data);
        });
    }
    
    function pathChanged(){
    	loadPreloaderSnapShot();
    	setDocumentPath(getDocumentPath());
    }

    function getDocumentPath(){
    	return '/api/v2/cms/contents/app-amh-shop-fa/content';
    }
    
    function createPreloaderSnapShot(){}
    function loadPreloaderSnapShot(){}
    
    // init controller
    createPreloaderSnapShot();
    setDocumentPath(getDocumentPath());
});
