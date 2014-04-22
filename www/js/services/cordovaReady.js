angular.module('driveme')
	.factory('cordovaReadyService', function ($http, $localStorage) {
		return function (fn) {
	    var queue = [];

	    var impl = function () {
	      queue.push(Array.prototype.slice.call(arguments));
	    };

	    document.addEventListener('deviceready', function () {
	      queue.forEach(function (args) {
	        fn.apply(this, args);
	      });
	      impl = fn;
	    }, false);

	    return function () {
	      return impl.apply(this, arguments);
	    };
	  };
	});