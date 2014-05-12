
angular.module('driveme')
	.controller('LogInCtrl', function ($scope, $state, userService) {

		$scope.logger = 
		{
			login: "",
			password: "",

		};

		$scope.login = function() {
			userService.login($scope.logger);
		};
	});