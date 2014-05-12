angular.module('driveme')
	.controller('StartCtrl', function ($scope, $state, userService) {

		$scope.logIn = function() {
			userService.checkUserIsLogged("tabs.news");
		};

		$scope.signUp = function() {
			$state.go('signup');
		};
	});