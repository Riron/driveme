angular.module('driveme')
  .controller('ArticleCtrl', function ($scope, $stateParams) {
    $scope.id = $stateParams.id;
  });