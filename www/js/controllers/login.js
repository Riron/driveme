angular.module('driveme')
  .controller('LogInCtrl', function ($scope, $state) {
	  $scope.login = function(user) {
	    $state.go('tabs.news');
	  };
	});