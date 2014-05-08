angular.module('driveme')
	.factory('apiService', function ($http, $localStorage) {
		return {
			init: function (token) {
				if(typeof token !== 'undefined')
				{
					$localStorage.token = token;
				}
				$http.defaults.headers.common['X-Access-Token'] = token || $localStorage.token;
			}, 

			remove: function(){
				delete $http.defaults.headers.common['X-Access-Token'];
			}
		};
	});