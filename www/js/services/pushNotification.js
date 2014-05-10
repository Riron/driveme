angular.module('driveme')
	.factory('pushNotificationService', function (Restangular) { 
		function initializePush () {
			console.info('Device is ready.  Registering with GCM server');
      //register with google GCM server
      var pushNotification = window.plugins.pushNotification;
      pushNotification.register(successHandler, errorHandler, {"senderID": '978233708089',"ecb":"onNotificationGCM"});
		};

		function successHandler (result) {
			console.info('GCM registering complete! Result = '+result);
		};

		function errorHandler (error) {
			console.error('Error while registering to GCM : '+error)
		};

		var push = {
			initialize: function () {
				// For desktop tests purpose
				if(ionic.Platform.isAndroid())
					// Initialize push notification when device is ready
					ionic.Platform.ready(function() {initializePush();});
			},
			unregister: function () {
				console.info('unregister')
          var push = window.plugins.pushNotification;
          if (push) {
              push.unregister(function () {
                  console.info('unregister success')
              });
          }
			}
		}

		return push;
	});

function onNotificationGCM (e) {
	console.info('Android notification incoming : '+ e.event + '');
	switch( e.event ) {
		case 'registered':
			if ( e.regid.length > 0 ) {
				console.log("Regid " + e.regid);
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.open("POST","http://rlier.fr:8282/api/v1/notification",true);
				xmlhttp.setRequestHeader("Content-type","application/json");
				xmlhttp.send(JSON.stringify({id: e.regid}));
			}
		break;
		case 'message':					   // this is the actual push notification. its format depends on the data model from the push server
			console.log('message = '+e.message+' msgcnt = '+e.msgcnt);	
		break;	
		case 'error':
			console.log('GCM error = '+e.msg);
		break;
		default:
			console.log('An unknown GCM event has occurred');
		break;
	}
};