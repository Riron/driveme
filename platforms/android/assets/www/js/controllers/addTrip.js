angular.module('driveme')
  .controller('AddTripCtrl', ['$scope', 'socketService', 'Restangular', '$localStorage', '$state', function ($scope, socket, Restangular, $localStorage, $state) {
    $scope.trip = {seats: 4, user_id: $localStorage.id};

    var baseTrip = Restangular.all('trips');

    $scope.addTrip = function () {
      baseTrip.post($scope.trip).then(function () {
    		// Notify that a trip has been added
	  		socket.emit('trip added');
	  		// And go back to trips page
	  		$state.go('tabs.trip');
    	});
    }
  }]);