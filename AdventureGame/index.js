'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Local development server listening on port 3000.');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


// =================================================================================
// App Logic
// =================================================================================

const handlers = {

    'LAUNCH': function() {
        let speech = '¿Pasas por la puerta azul o por la puerta roja?';
        let reprompt = 'Tu tiene dos opciones, la puerta azul, o la puerta roja.';
        app.ask(speech, reprompt);
    },

    'EnterDoorIntent': function(color) {
        let speech = '';
        let reprompt = '';
    
        if (color == 'blue' || color == 'red') {
            speech = 'You chose to go through the ' + color + ' door.';
            app.tell(speech);
        } else {
            speech = 'Please choose either the blue door or the red door.';
            reprompt = 'Say blue door, or red door.';
            app.ask(speech, reprompt);
        }
    }
};
