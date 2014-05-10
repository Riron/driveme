angular.module('driveme')
  .controller('TripCtrl', ['$scope', 'socketService', '$filter', '$localStorage', '$ionicLoading', function ($scope, socket, $filter, $localStorage, $ionicLoading) {
    $scope.trips = [];
    $scope.id = $localStorage.id;

    $scope.doesParticipate = function (participants, id) {
    	return participants.indexOf(parseInt(id)) != -1
  	}
    $ionicLoading.show({
      template: 'Chargement...'
    });
    socket.emit('get trips', {update: true});
    socket.on('update', function (data) {
    	$scope.trips = data;
      $ionicLoading.hide();
    });
  }]);