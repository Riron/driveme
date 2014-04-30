angular.module('driveme')
  .controller('ArticleCtrl', function ($scope, $stateParams, Restangular) {

	  $scope.getArticle = function () {
			Restangular.one('news', $stateParams.id).get().then(function (article) {
				$scope.article = article[0];
			});
	  }

	  $scope.getArticle();
  });