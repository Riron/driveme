angular.module('driveme')
  .controller('SignInCtrl', function ($scope, $state) {
	  $scope.signIn = function(user) {
	    console.log('Sign-In', user);
	    $state.go('tabs.news');
	  };
	});