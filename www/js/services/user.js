angular.module('driveme')
	.factory('userService', function (Restangular) {
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
				user.username = '';
			}
		};
	});