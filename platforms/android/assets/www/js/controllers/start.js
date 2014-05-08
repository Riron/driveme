angular.module('driveme')
  .controller('StartCtrl', function ($scope, $state, Restangular) {
	  $scope.logIn = function() {
	  	//$state.go('login');
		Restangular.all('loginWithToken').post()
			.then(function(res){
				$state.go('tabs.news');
			}, function(res) {
				$state.go('login');
			});
	  };

  	  $scope.signUp = function() {
	  	$state.go('signup');
	  };
	});