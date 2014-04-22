// Fallback for desktop testings
var Camera = Camera || {
    PictureSourceType: {
        PHOTOLIBRARY : 0,
        CAMERA : 1,
        SAVEDPHOTOALBUM : 2
    },
    DestinationType: {
        DATA_URL : 0,
        FILE_URI : 1,
        NATIVE_URI : 2
    },
    EncodingType: {
        JPEG : 0,
        PNG : 1
    },
    MediaType: {
        PICTURE: 0,
        VIDEO: 1,
        ALLMEDIA : 2
    },
    Direction: {
        BACK : 0,
        FRONT : 1
    }
};

angular.module('driveme')
	.factory('cameraService', function (cordovaReadyService) {
		return {
			// Wrap it into the cordovaReady service
			getPicture: cordovaReadyService(function(onSuccess, onError, options) {
				// Define default options
				var options = options || {};
				options.destinationType = options.destinationType || Camera.DestinationType.FILE_URI;
				options.encodingType = options.encodingType || Camera.EncodingType.JPEG;
				options.quality = options.quality || 10;
				// Get picture
				navigator.camera.getPicture(onSuccess, onError, options);
			}),
		};
	});