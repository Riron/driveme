angular.module('driveme')
  .controller('DisplayTripCtrl', ['$scope', '$stateParams', 'Restangular', '$localStorage', 'socketService', function ($scope, $stateParams, Restangular, $localStorage, socket) {
    $scope.id = $stateParams.id;
    $scope.participants = [];
    $scope.in = false;
    $scope.button_text = 'S\'ajouter à la liste';
    $scope.user_id = $localStorage.id;

    Restangular.one('trips', $stateParams.id).getList().then(function (trip) {
    	$scope.trip = trip[0];
    	console.log($scope.trip);
    })

    $scope.listParticipants = function () {
      Restangular.one('trips', $stateParams.id).getList('users').then(function (users) {
      	$scope.participants = users;
      	console.log($scope.participants);
        // If user is already participant, switch in to true
        angular.forEach(users, function (value) {
          console.log(value.id +'-'+ $scope.user_id)
          if(value.id == $scope.user_id) {
            $scope.in = true;
            $scope.button_text = 'Se retirer de la liste';
          }
        });
      })
    }

    $scope.participate = function () {
    	if(!$scope.in) {
        Restangular.one('trips', $stateParams.id).post('users', {user_id: $scope.user_id, trip_id: $scope.trip.id}).then(function () {
            console.log('New user participating');
            $scope.in = true;
            socket.emit('participant change', {trip_id: $scope.id});
            $scope.listParticipants();
            $scope.button_text = 'Se retirer de la liste';
        });
      }
      // If already subscribed, un-subscribe
      else {
        Restangular.one('trips', $stateParams.id).one('users').remove({user_id: $scope.user_id, trip_id: $scope.trip.id}).then(function () {
          console.log('User participation cancelled');
          socket.emit('participant change', {trip_id: $scope.id}); 
          $scope.listParticipants();
          $scope.button_text = 'S\'ajouter à la liste';
          $scope.in = false;
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