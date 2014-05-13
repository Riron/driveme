var test;
var _scope;
angular.module('driveme')
	.controller('SignUpCtrl', function ($scope, $state) 
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
		test = $scope.userSignUp;

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
			_scope=$scope;
			$scope.userSignUp.same = $scope.userSignUp.passwordA === $scope.userSignUp.passwordB;
			if(!$scope.userSignUp.same)
			{
				signUpForm.passwordB.$setValidity('pwd', false); 
			}
		};





	});