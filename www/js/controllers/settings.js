angular.module('driveme')
  .controller('SettingsCtrl', function ($scope, $ionicActionSheet, cameraService, Restangular, $state) {

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

  	$scope.getUserInfo = function () {
  		$scope.userId = $localStorage.id;
			Restangular.one('users', $scope.userId).get().then(function (user) {
				$scope.user = user[0];
			});
	  };

	  $scope.getUserInfo();

	  $scope.saveInfos = function () {
	  	Restangular.one('users', $scope.userId).customPUT($scope.user).then(function () {
	  		$state.go('tabs.profile');
	  	})
	  }
  });