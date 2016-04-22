// see https://amzn.com/0805047905

exports.handler = function( event, context ) {
    var say = "";
    var sessionAttributes = {};
    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome!  Brown bear, brown bear, what do you see?";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "ISeeIntent") {

            if(event.request.intent.slots.Color.value && event.request.intent.slots.Animal.value) {

               var myColor  = event.request.intent.slots.Color.value;
               var myAnimal = event.request.intent.slots.Animal.value;

               if (!sessionAttributes.myList)  {sessionAttributes.myList = []; }

               sessionAttributes.myList.push(myColor + " " + myAnimal);

               say = myColor + " " + myAnimal + ", " + myColor + " " + myAnimal +  ", what do you see? ";

            } else {
                say = "you can say things like, I see a red bird looking at me";
            }

        } else if (IntentName === "EndIntent") {
            say = "We see a " + sessionAttributes.myList.toString() + " looking at us.  Thank you for playing!";

        }
    }

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: say
        },
        shouldEndSession: false
    };

    context.succeed( {sessionAttributes: sessionAttributes, response: response } );

};


