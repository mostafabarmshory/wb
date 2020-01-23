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
 * The route parameters are a combination of $location's search() and path().
 * The path parameters are extracted when the $route path is matched.
 * 
 * In case of parameter name collision, path params take precedence over search
 * params.
 * 
 * The service guarantees that the identity of the $routeParams object will
 * remain unchanged (but its properties will likely change) even when a route
 * change occurs.
 * 
 * Note that the $routeParams are only updated after a route change completes
 * successfully. This means that you cannot rely on $routeParams being correct
 * in route resolve functions. Instead you can use $route.current.params to
 * access the new route's parameters.
 * 
 * 
 * @returns
 */
angular.module('wb').service('$routeParams', function() {

});