'use strict';
var APP_ID;
var SPEECH_OUTPUT = "I am your greeter and I am here to say, Hello!";
var AlexaSkill = require('./AlexaSkill');
var GreeterService = function() {
	AlexaSkill.call(this, APP_ID);
};

GreeterService.prototype = Object.create(AlexaSkill.prototype);
var helloResponseFunction = function(intent, session, response) {
	response.tell(SPEECH_OUTPUT);
};

GreeterService.prototype.eventHandlers.onLaunch = helloResponseFunction;

GreeterService.prototype.intentHandlers = {
	"HelloIntent": helloResponseFunction
  },
	
	"AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hi or hello or greet me");
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

exports.handler = function(event, context) {
  var greeterService = new GreeterService();
  greeterService.execute(event, context);
};