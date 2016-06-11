/**
 * Put the alexa-sdk folder in node_modules
 * â”œâ”€â”€ index.js
 * â””â”€â”€ node_modules
 *     â””â”€â”€ alexa-sdk
 */

'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.echo-sdk-ams.app.1234';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.setAppId(appId);
    alexa.registerHandlers(newSessionHandlers, guessModeHandlers, startGameHandlers, guessAttemptHandlers);
    alexa.execute();
};

var state = {
    GUESSMODE: '_GUESSMODE',
    STARTMODE: '_STARTMODE'
};

var newSessionHandlers = {
    ':NewSession': function() {
        console.log("handler for: " + this.name);
        this.attributes[Alexa.StateString] = state.STARTMODE;
        this.emit(':ask', this.getSSMLResponse("Welcome to High Low guessing game, would you like to play?"), this.getSSMLResponse('Say yes to start the game or no to quit.'));
    }
};

var startGameHandlers = Alexa.CreateStateHandler(state.STARTMODE, {
    'AMAZON.HelpIntent': function() {
        console.log("handler for: " + this.name);
        var message = 'I will think of a number between zero and one hundred, try to guess and I will tell you if it is higher or lower. Do you want to start the game?';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(message));
    },
    'AMAZON.YesIntent': function() {
        console.log("handler for: " + this.name);
        this.attributes["guessNumber"] = Math.floor(Math.random() * 100);
        this.attributes[Alexa.StateString] = state.GUESSMODE;
        var message = 'Try saying a number to start the game.';
        var prompt = 'Great! ' + message;
        this.emit(':ask', this.getSSMLResponse(prompt), this.getSSMLResponse(message));
    },
    'AMAZON.NoIntent': function() {
        console.log("handler for: " + this.name);
        var message = 'Ok, see you next time!';
        this.emit(':tell', this.getSSMLResponse(message));
    },
    'Unhandled': function() {
        var message = 'Say yes to continue, or no to end the game.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(message));
    }
});

var guessModeHandlers = Alexa.CreateStateHandler(state.GUESSMODE, {
    'NumberGuessIntent': function() {
        console.log("handler for: " + this.name);
        var guess = parseInt(this.event.request.intent.slots.number.value);
        var num = this.attributes["guessNumber"];

        console.log('user guessed: ' + guess);

        if(guess > num){
            this.emit('TooHigh');
        } else if( guess < num){
            this.emit('TooLow');
        } else if (guess === num){
            this.emit('JustRight')
        } else {
            this.emit('NotANum');
        }
    },
    'AMAZON.HelpIntent': function() {
        var message = 'I am thinking of a number between zero and one hundred, try to guess and I will tell you if it is higher or lower.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(message));

    },
    'Unhandled': function() {
        var message = 'Sorry, I didn\'t get that. Try saying a number.';
        var reprompt = 'Try saying a number.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(reprompt));
    }
});

var guessAttemptHandlers = {
    'TooHigh': function(){
        var message = 'Too high.';
        var reprompt = 'Try saying a larger number.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(reprompt));
    },
    'TooLow': function(){
        var message = 'Too low.';
        var reprompt = 'Try saying a smaller number.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(reprompt));
    },
    'JustRight': function(){
        var message = 'You got it! Would you like to play a new game?';
        var reprompt = 'Say yes to start a new game, or no to end the game.';
        this.attributes[Alexa.StateString] = state.STARTMODE;
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(reprompt));
    },
    'NotANum': function(){
        var message = 'Sorry, I didn\'t get that. Try saying a number.';
        var reprompt = 'Try saying a number.';
        this.emit(':ask', this.getSSMLResponse(message), this.getSSMLResponse(reprompt));
    }
};