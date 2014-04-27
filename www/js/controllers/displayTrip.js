angular.module('driveme')
  .controller('DisplayTripCtrl', function ($scope, $stateParams, Restangular, $localStorage) {
    $scope.id = $stateParams.id;
    $scope.participants = [];
    $scope.in = true

    Restangular.one('trips', $stateParams.id).getList().then(function (trip) {
    	$scope.trip = trip[0];
    	console.log($scope.trip);
    })

    Restangular.one('trips', $stateParams.id).getList('users').then(function (users) {
    	$scope.participants = users;
    	console.log($scope.participants);
      // TODO: if user is already participant, switch in to true
      // $scope.in = true;
    })

    $scope.participate = function () {
    	if(!$scope.in) {
        Restangular.one('trips', $stateParams.id).post('users', {user_id: 1, trip_id: $scope.trip.id}).then(function () {
            console.log('New user participating');
            $scope.in = true;
        });
      }
      // If already subscribed, un-subscribe
      else {
        Restangular.one('trips', $stateParams.id).one('users').remove({user_id: 1, trip_id: $scope.trip.id}).then(function () {
          console.log('User participation cancelled');
        })
      }
    }
  });