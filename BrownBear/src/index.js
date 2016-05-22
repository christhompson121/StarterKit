// Brown Bear Alexa sample skill
// see https://amzn.com/0805047905

// var AWS = require('aws-sdk');

exports.handler = function( event, context ) {
    var say = "";
    var endsession = false;
    var sessionAttributes = {};
    var myColor = "brown";
    var myAnimal = "bear";

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome!  Brown bear, brown bear, what do you see?";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "ISeeIntent") {

            if(event.request.intent.slots.Color.value && event.request.intent.slots.Animal.value) {

               myColor  = event.request.intent.slots.Color.value;
               myAnimal = event.request.intent.slots.Animal.value;

               if (!sessionAttributes.myList)  {sessionAttributes.myList = []; }

               sessionAttributes.myList.push(myColor + " " + myAnimal);

               say = myColor + " " + myAnimal + ", " + myColor + " " + myAnimal +  ", what do you see? ";

            } else {
                say = "you can say things like, I see a red bird looking at me";
            }

        } else if (IntentName === "EndIntent") {
            say = "We see a " + sessionAttributes.myList.toString() + " looking at us.  Thank you for playing!";
            endsession = true;

        }
    }

    var response = {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        shouldEndSession: endsession
    };

    // may uncomment to add AWS SQS sendMessage.  Be sure to adjust the QueueUrl with your own AWS Account Number.

    // var sqs_params = {
    //    QueueUrl: "https://sqs.us-east-1.amazonaws.com/333304289633/AlexaQueue",
    //    MessageBody: "https://www.google.com/search?tbm=isch&q=" + myColor + "%20" + myAnimal  // Image Search URL
    // }
    //
    // var sqs = new AWS.SQS({region : 'us-east-1'}).sendMessage(sqs_params);
    //
    // sqs.on('success', function() {

            // this line terminates the Lambda function.
            // It should be moved to within the deepest level of any nested asynchronous callbacks you add.
            context.succeed( {sessionAttributes: sessionAttributes, response: response } );

    // may uncomment to complete callback to SQS
    // });
    // sqs.send();



};


