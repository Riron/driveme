angular.module('driveme')
  .controller('SettingsCtrl', function ($scope, $ionicActionSheet, cameraService) {
    $scope.profilePicture = 'http://lorempixel.com/50/50/people/';

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
						cameraService.getPicture(function(imageURI) {
							console.log('Galery :' + imageURI);
							$scope.profilePicture = imageURI;
						}, function(error) {
							console.log(error);
						}, {sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
					}
					// Camera
					else if(index === 1) {
						cameraService.getPicture(function(imageURI) {
							console.log('Camera :' +imageURI);
							$scope.profilePicture = imageURI;
						}, function(error) {
							console.log(error);
						}, {sourceType: Camera.PictureSourceType.CAMERA});
					}
				return true;
				}
			});
	 };
  });