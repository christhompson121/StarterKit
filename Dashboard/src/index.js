// Inventory Dashboard Alexa Skill - publish your data with your code!

var dataset = require('./datafiles/dataset.js');

// var AWS = require('aws-sdk');

exports.handler = function( event, context ) {
    var say = "";
    var endsession = false;
    var sessionAttributes = {};

    var myItem = "apples";
    var Qty = 0;

    //var InlineDataSet = [];  // array
    //InlineDataSet.push({item:"apples", qty:"10"});
    //InlineDataSet.push({item:"bananas", qty:"7"});
    //InlineDataSet.push({item:"oranges", qty:"15"});

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to Supermarket Inventory! You can ask me about apples, oranges, and other items.";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "QuantityOnHandIntent") {

            if(event.request.intent.slots.Item.value) {

                myItem  = event.request.intent.slots.Item.value;

                if (!sessionAttributes.ItemList)  {sessionAttributes.ItemList = []; }
                sessionAttributes.ItemList.push(myItem );

                for (var i = 0; i < dataset.length; i++) {
                    if(myItem == dataset[i].item) {
                        Qty = dataset[i].qty;
                    }
                }

                say = "there are " + Qty + " " + myItem  ;

            } else {
                say = "you can say things like, tell me about oranges";
            }

        } else if (IntentName === "EndIntent") {
            say = "You asked for " + sayItems(sessionAttributes.ItemList.toString()) + " Thank you for visiting!";
            endsession = true;

        }
    }

    var response = {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa Companion mobile App or alexa.amazon.com"
        },

        shouldEndSession: endsession
    };



    Respond(  // Respond with normal speech only
        function() {context.succeed( {sessionAttributes: sessionAttributes, response: response } ); }
    );


    // --------- Uncomment for AWS SQS Integration -------------------------------------------------
    //RespondSendSqsMessage(  // use this to send a new message to an SQS Queue
    //    {
    //        MessageBody:  "https://www.google.com/search?tbm=isch&q=" + myColor + "%20" + myAnimal  // Message Body (Image Search URL)
    //    },
    //     function() {context.succeed( {sessionAttributes: sessionAttributes, response: response } ); }
    //);


    // --------- Uncomment for AWS IOT Integration -------------------------------------------------
    //RespondUpdateIotShadow(  // use this to update an IoT device state
    //    {
    //        IOT_THING_NAME: "MyDevice",
    //        IOT_DESIRED_STATE: {"pump":1}  // or send spoken slot value detected
    //    },
    //    function() {context.succeed( {sessionAttributes: sessionAttributes, response: response } ); }
    //);


};

// -----------------------------------------------------------------------------

function Respond(callback) {
    callback(); // execute the caller's context.succeed function to complete
}


function sayItems(items) {  // format a comma separated list of items, to include the word "and" before the final item
    var startingList = "";
    if (typeof items == "string") {
        startingList = items;
    } else {
        startingList = items.toString();
    }

    var formattedString = "";
    var lastComma = startingList.lastIndexOf(",");

    if (lastComma == -1) {  // single element
        formattedString = startingList;
    } else {
        formattedString = startingList.substr(0,lastComma) + ", and " + startingList.substr(lastComma +1, 1000);
        formattedString = formattedString.replace(",", ", ");
        formattedString = formattedString.replace("  ", " ");
    }
    return formattedString;

}



function RespondSendSqsMessage(sqs_params, callback) {

    sqs_params.QueueUrl = "https://sqs.us-east-1.amazonaws.com/333304289684/AlexaQueue";

    var sqs = new AWS.SQS({region : 'us-east-1'});


    sqs.sendMessage(sqs_params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log("success calling sqs sendMessage");

            callback();  // after performing SQS send, execute the caller's context.succeed function to complete
        }
    });

}


function RespondUpdateIotShadow(iot_config, callback) {

    iot_config.IOT_BROKER_ENDPOINT      = "https://A2ESHRCP6U0Y0C.iot.us-east-1.amazonaws.com".toLowerCase();
    iot_config.IOT_BROKER_REGION       = "us-east-1";


    var iotData = new AWS.IotData({endpoint: iot_config.IOT_BROKER_ENDPOINT});

    //Set the pump to 1 for activation on the device
    var payloadObj={ "state":
    { "desired":
    iot_config.IOT_DESIRED_STATE // {"pump":1}
    }
    };

    //Prepare the parameters of the update call
    var paramsUpdate = {
        "thingName" : iot_config.IOT_THING_NAME,
        "payload" : JSON.stringify(payloadObj)
    };
    // see results in IoT console, MQTT client tab, subscribe to $aws/things/YourDevice/shadow/update/delta

    //Update Device Shadow
    iotData.updateThingShadow(paramsUpdate, function(err, data) {
        if (err){
            console.log(err.toString());
        }
        else {
            console.log("success calling IoT updateThingShadow");
            callback();  // after performing Iot action, execute the caller's context.succeed function to complete
        }
    });



}
