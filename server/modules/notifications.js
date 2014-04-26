var gcm = require('node-gcm');

var message = new gcm.Message();
//API Server Key
var sender = new gcm.Sender('AIzaSyDPgiWpDjlAr4bD25bf2STes5si8KtkGdA');
// Ids
var registrationIds = [];


// Value the payload data to send...
message.addData('message', "Hello Cordova!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','2'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
message.collapseKey = 'demo';
message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push("APA91bF0JtyLIBcM-MCJM1_u9gh3nnfu_NAqREf5FnTOU0ZD_v4BjLajUA9c4dmtJrHXP_iBWrg97Ru1Pqzz9hYvxUFnMma85HrErrJ_imSOG63oFTmYNt0V8Eb6Ouq9hkgmTj2vW11jsPQAvz6wTXsq3HZlFnNSZaIjhhRBF58g97IMJHXGjnw");
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
/*sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});*/

exports.send = "Push notfication sent"; 
