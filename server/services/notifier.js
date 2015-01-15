/**
 * Created by agamal on 12/30/2014.
 */
var azure=require ('azure');
var notificationHubService= azure.createNotificationHubService('smma','Endpoint=sb://smma-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=J1uDMsmAfIU5eoB5aBFQATRpxI94BI/r/FIA1TIb1Ls=')

var notifier= {};

notifier.send= function(message){

    var payload = {
        data: {
            msg: message
        }
    };
    notificationHubService.gcm.send(null, payload, function(error){
        if(!error){
            //notification sent
        }
    });

};

module.exports=notifier;