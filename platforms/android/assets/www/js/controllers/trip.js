angular.module('driveme')
  .controller('TripCtrl', ['$scope', 'socketService', '$filter', '$localStorage', function ($scope, socket, $filter, $localStorage) {
    $scope.trips = [];
    $scope.id = $localStorage.id;

    $scope.doesParticipate = function (participants, id) {
    	return participants.indexOf(parseInt(id)) != -1
  	}

    socket.emit('get trips', {update: true});
    socket.on('update', function (data) {
    	$scope.trips = data;
    });
  }]);