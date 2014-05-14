angular.module('driveme')
	.controller('SignUpCtrl', function ($scope, $state, userService) 
	{
		$scope.userSignUp = 
			{
				firstname : "",
				lastname : "",
				username : "",
				passwordA : "",
				passwordB : "",
				same : "false",
			};

		$scope.change = function(){
			var firstname = '';
			var lastname = '';
			if(typeof $scope.userSignUp.firstname !== 'undefined')
			{
				firstname =$scope.userSignUp.firstname;
			}
			if(typeof $scope.userSignUp.lastname !== 'undefined')
			{
				lastname = $scope.userSignUp.lastname;
			}
			var point = (firstname !== "" || lastname !== "") ? "." : "" ;
			$scope.userSignUp.username = firstname +point+lastname;
		};

		$scope.checkPassword = function(){
			$scope.userSignUp.same = $scope.userSignUp.passwordA === $scope.userSignUp.passwordB;
		};

		$scope.signUp = function(){
			userService.signUp($scope.userSignUp);
		};

	});