angular.module('driveme')
  .controller('TripCtrl', ['$scope', 'socketService', '$filter', function ($scope, socket, $filter) {
    $scope.trips = [];

    socket.emit('get trips', {update: true});
    socket.on('update', function (data) {
    	$scope.trips = data;
    });
  }]);