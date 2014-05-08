var lolo;
angular.module('driveme')
	.controller('LogInCtrl', function ($scope, $state, Restangular, $localStorage, apiService) {

		$scope.logger = {};

		$scope.login = function() {
			Restangular.all('login').post($scope.logger)
				.then(function(res) {
					$localStorage.token = res.token;
					apiService.init(res.token);
					$localStorage.id = res.token.split(':')[0];
					$state.go('tabs.news');
				}, function(res) {
					alert('Erreur de login !');
  				});
			//$state.go('tabs.news');
		};
	});