angular.module('driveme')
	.controller('LogInCtrl', function ($scope, $state, Restangular, $localStorage, apiService) {

		var logger = Restangular.all('login');

		$scope.login = function(login) {
			logger.post(login)
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