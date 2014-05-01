angular.module('driveme')
  .controller('ProfileCtrl', function ($scope, $stateParams, Restangular, $localStorage, $filter) {

	  $scope.getUserInfo = function () {
	  	if(typeof $stateParams.id == 'undefined') {
	  		// $scope.userId = $localStorage.id;
	  		$scope.userId = 1;
	  		$scope.edit = true;

	  	}
			Restangular.one('users', $scope.userId).get().then(function (user) {
				$scope.user = user[0];
				$scope.user.username = $filter('name')($scope.user.username);
			});
	  }

	  $scope.getUserInfo();
  });