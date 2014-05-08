angular.module('driveme')
	.factory('tokenInterceptor', function (apiService, Restangular) {
		return {
			init : function(){
				console.log("je suis dans l'interceptor");
				Restangular.addResponseInterceptor(function (element, operation, route, url, headers, params, httpConfig) { 
				    var header = headers.headers();
				    if( header !== undefined && headers !== null)
				    {
						var token = ((header['x-access-token'] !== undefined && header['x-access-token'] !== null) ? header['x-access-token'] : null);
						console.log("intercep token dans l'interceptor: ", token);
						if(token !== null) { 
							apiService.init(token); 
						}
				    }
				    return element;
			  	});
			},
		};
	});