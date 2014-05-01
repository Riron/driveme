angular.module('driveme')
	.filter('name', function() {
	  return function(input) {
	  	if(typeof input === 'undefined') {
	  		return input;
	  	}
	    input = input.split('.');
	    var output = '';
	    angular.forEach(input, function (value, key) {
	    	if (key != 0) {
	    		output += ' ';
	    	}
	    	output += value;
	    });
	    output = output.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			});
			return output;
	  };
	});