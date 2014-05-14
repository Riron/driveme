angular.module('driveme')
	.controller('StartCtrl', function ($scope, $state, userService) {

		$scope.logIn = function() {
			userService.checkUserIsLogged("tabs.news", false);
		};

		$scope.signUp = function() {
			$state.go('signup');
		};
	});