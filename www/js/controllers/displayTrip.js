angular.module('driveme')
  .controller('DisplayTripCtrl', ['$scope', '$stateParams'; 'Restangular', '$localStorage', 'socketService', function ($scope, $stateParams, Restangular, $localStorage, socket) {
    $scope.id = $stateParams.id;
    $scope.participants = [];
    $scope.in = true

    Restangular.one('trips', $stateParams.id).getList().then(function (trip) {
    	$scope.trip = trip[0];
    	console.log($scope.trip);
    })

    $scope.listParticipants = function () {
      Restangular.one('trips', $stateParams.id).getList('users').then(function (users) {
      	$scope.participants = users;
      	console.log($scope.participants);
        // TODO: if user is already participant, switch in to true
        // $scope.in = true;
      })
    }

    $scope.participate = function () {
    	if(!$scope.in) {
        Restangular.one('trips', $stateParams.id).post('users', {user_id: 1, trip_id: $scope.trip.id}).then(function () {
            console.log('New user participating');
            $scope.in = true;
            $socket.emit('participant change', {trip_id: $scope.id});
        });
      }
      // If already subscribed, un-subscribe
      else {
        Restangular.one('trips', $stateParams.id).one('users').remove({user_id: 1, trip_id: $scope.trip.id}).then(function () {
          console.log('User participation cancelled');
          $socket.emit('participant change', {trip_id: $scope.id});    
        })
      }
    }

    socket.on('update participants', function (data) {
      // Update participant list if needed
      if(data.trip_id == $scope.id) {
        $scope.listParticipants();
      }
    });

    $scope.listParticipants();
  }]);