angular.module('driveme')
	.factory('userService', function ($localStorage, $state, Restangular, apiService) {
		var user = {
			isLogged: false,
			username: ''
		};

		//Routes config
		var loginRoute = Restangular.all('login');

		return {
			isLogged: function() {
        		return user.isLogged;
      		},
			login: function (credentials) {
				// Login here
			},
			logout: function () {
				user.isLogged = false;
				$localStorage.$reset();
				apiService.remove();
				$state.go("start");
			}
		};
	});