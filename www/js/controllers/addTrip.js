angular.module('driveme')
  .controller('AddTripCtrl', ['$scope', 'socketService', 'Restangular', '$localStorage', '$state', function ($scope, socket, Restangular, $localStorage, $state) {
    // TEMP: id = 1 - Should be $localStorage.id later on
    $scope.trip = {seats: 4, user_id: 1};

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