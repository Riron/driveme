angular.module('driveme')
  .controller('SettingsCtrl', function ($scope, $ionicActionSheet) {
    $scope.showActionSheet = function() {
	   // Show the action sheet
	   $ionicActionSheet.show({
	     buttons: [
	       { text: 'Gallerie' },
	       { text: 'Appareil photo' },
	     ],
	     //destructiveText: 'Supprimer',
	     titleText: 'Changer de photo de profil',
	     cancelText: 'Annuler',
	     cancel: function() {
	     	return true;
	     },
	     buttonClicked: function(index) {
	     	//Gallery
	     	if(index === 0) {
	     		console.log('gallerie');
	     	}
	     	// Camera
	     	else if(index === 1) {
	     		console.log('appareil photo');
	     	}
	      return true;
	     }
	   });

	 };
  });