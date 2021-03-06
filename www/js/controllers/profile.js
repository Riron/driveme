angular.module('driveme')
  .controller('ProfileCtrl', function ($scope, $stateParams, Restangular, $localStorage, $filter, $window, userService) {

	  $scope.getUserInfo = function () {
	  	if(typeof $stateParams.id == 'undefined') {
	  		$scope.userId = $localStorage.id;
	  		$scope.edit = true;

	  	}
	  	else {
	  		$scope.userId = $stateParams.id;
	  	}
			Restangular.one('users', $scope.userId).get().then(function (user) {
				$scope.user = user[0];
				$scope.user.username = $filter('name')($scope.user.username);
			});
	  }

	  $scope.getUserInfo();

	  $scope.dial = function (number) {
	  	$window.location.href = "tel:" + number; 
	  }

	  $scope.logout= function(){
	  	userService.logout();
	  }

	  ionic.Platform.ready(function(){console.log(ionic.Platform.device())});
  });