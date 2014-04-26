angular.module('driveme')
  .controller('DisplayTripCtrl', function ($scope, $stateParams, Restangular) {
    $scope.id = $stateParams.id;

    Restangular.one('trips', $stateParams.id).getList().then(function (trip) {
    	$scope.trip = trip[0];
    	console.log($scope.trip);
    })
  });