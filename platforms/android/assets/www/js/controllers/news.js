angular.module('driveme')
  .controller('NewsCtrl', function ($scope, $ionicSideMenuDelegate, $state, $timeout) {
	  $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };

	  $scope.articles = [
	  	{id:1 ,title: 'Mon article', content: 'Du contenu pour mon premier article'},
	  	{id:2 ,title: 'Ma news', content: 'Du contenu pour mon second article désormais'},
	  ];

	  $scope.refreshNews = function() {
	  	$timeout(function() {
	  		$scope.$broadcast('scroll.refreshComplete');
	  	}, 1000);
	  	return true;
	  }

	  $scope.goTo = function(id) {
	  	$state.go('tabs.article');
	  }
	});