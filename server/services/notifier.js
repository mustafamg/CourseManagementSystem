/**
 * Created by agamal on 12/30/2014.
 */
var azure=require ('azure');
var notificationHubService= azure.createNotificationHubService('smma','Endpoint=sb://secc2015.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=mtOg4nqqupsFlh5BuXIZ1eOCodW0OTuyTOd8vOwEqmw=')

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