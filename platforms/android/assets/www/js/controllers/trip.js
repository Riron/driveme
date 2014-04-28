angular.module('driveme')
  .controller('TripCtrl', ['$scope', 'socketService', function ($scope, socket) {
    $scope.trips = [];

    socket.emit('get trips', {update: true});
    socket.on('update', function (data) {
    	$scope.trips = data;
    });
  }]);