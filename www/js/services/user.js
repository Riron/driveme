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
				loginRoute.post(credentials).then(function (response) {
					// Logged On
					user.isLogged = true;
					user.username = credentials.username;
					return true;
				}, function () {
					// Error
					return false;
				});
			},
			logout: function () {
				user.isLogged = false;
				user.username = '';
			}
		};
	});