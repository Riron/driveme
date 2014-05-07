angular.module('driveme')
  .controller('NewsCtrl', function ($scope, $ionicSideMenuDelegate, $state, $localStorage, Restangular) {
	  $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };

	  $scope.getNews = function () {
	  	// We store articles offline
	  	if($localStorage.articles) {
	  		$scope.articles = $localStorage.articles
	  	}
	  	// If nothing is stored, fetch news online
	  	else {
	  		$scope.fetchNews();
	  	}
	  }

	  $scope.fetchNews = function () {
	  	Restangular.all('news').getList().then(function (news) {
		  	$scope.articles = news;
		  	// Store articles offline
		  	$localStorage.articles = news;
		  	console.log('News fetched');
		  	$scope.$broadcast('scroll.refreshComplete');
		  });
		}

	  $scope.goTo = function(id) {
	  	$state.go('tabs.article');
	  }

	  $scope.getNews();
	});