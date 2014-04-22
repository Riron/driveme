angular.module('driveme')
  .controller('TripCtrl', ['$scope', 'socketService', function ($scope, socket) {
    $scope.trips = [];

    socket.on('init', function (data) {
    	$scope.trips = data;
    	console.log(data);
    });

    socket.on('newTrip', function (trip) {

    	$scope.trips.push(trip);
    });
  }]);