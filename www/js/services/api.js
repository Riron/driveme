angular.module('driveme')
	.factory('apiService', function ($http, $localStorage) {
		return {
			init: function (token) {
				console.log('init :', token);
				$http.defaults.headers.common['X-Access-Token'] = token || $localStorage.token;
			}
		};
	});