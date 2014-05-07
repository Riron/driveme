angular.module('driveme')
  .controller('StartCtrl', function ($scope, $state) {
	  $scope.logIn = function() {
	  	$state.go('login');
	  };

  	  $scope.signUp = function() {
	  	$state.go('signup');
	  };
	});