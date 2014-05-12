angular.module('driveme')
	.factory('apiService', function ($http, $localStorage) {
		return {
			init: function (token) {
				if(typeof token !== 'undefined')
				{
					$localStorage.token = token;
					$localStorage.id = token.split(':')[0];
				}
				$http.defaults.headers.common['X-Access-Token'] = token || $localStorage.token;
			}, 

			remove: function(){
				delete $http.defaults.headers.common['X-Access-Token'];
			}
		};
	});