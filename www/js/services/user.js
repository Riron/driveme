angular.module('driveme')
	.factory('userService', function ($localStorage, $state, Restangular, apiService) {
		var user = {
			isLogged: false,
			username: ''
		};

		//Routes config
		var loginRoute = Restangular.all('login');

		return {
			isLogged: function() {
        		return user.isLogged;
      		},
      		checkUserIsLogged: function(redirectionIfLogged, firstStart){
      			if( typeof $localStorage.token !== "undefined")
      			{
					Restangular.all('loginWithToken').post()
					.then(function(res){
						$state.go(redirectionIfLogged);
						user.isLogged = true;
						return user.isLogged;
					}, function(res) {
						$state.go('login');
						user.isLogged = false;
						return user.isLogged;
					});
				}
				else{
					if(!firstStart)
					{
						$state.go('login');
					}
					user.isLogged = false;
					return user.isLogged;
				}
      		},
			login: function (login) {
				Restangular.all('login').post(login)
				.then(function(res) {
					if( typeof res.token !== "undefined")
					{
						apiService.init(res.token);
						$state.go('tabs.news');
					}
					else{
						alert("Erreur de login !")
					}
				}, function(res) {
					alert("Le service à retourné une erreur. Veuillez vérifier que vous avez bien accès à internet");
  				});
			},
			signUp : function(newUser){
				console.log('coucou signUp');
				Restangular.all('signUp').post(newUser)
				.then(function(res){
					//success
					console.log('new user success', res);
					if(typeof res.token !== 'undefined')
					{
						apiService.init(res.token);
						$state.go('tabs.news');
					}
					else
					{
						// Alors il y a eu un problème lors des vérifications côté serveur avec le message suivant
						alert(res.message);
					}
				}, function(res){
					//fail
					console.log('new user fail', res);
					alert("Le service à retourné une erreur. Veuillez vérifier que vous avez bien accès à internet");
				});
			},
			logout: function () {
				user.isLogged = false;
				$localStorage.$reset();
				apiService.remove();
				$state.go("start");
			}
		};
	});