var wolf = require('node-wolfram');

function wa(config) {
    this.Wolf = new wolf(config.plugins.waID);
}


wa.prototype.query = function(from, to, query, bot) {
    this.Wolf.query(query, function(err, result) {
        if(result === null
            || result === undefined
            || result.queryresult === null
            || result.queryresult === undefined
            || result.queryresult.pod === undefined) {
            bot.say(to, from + ': I do not have a response for that.');
            return;
        }
        var response = result.queryresult.pod[1].subpod[0].plaintext[0];
        bot.say(to, from + ': ' + response);

    });
};

var W;
// Plugin initialization.
exports.init = function (bot, config) {
    W = new wa(config);
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
    try {
        var textArray = text.split(' ');
        if (config.plugins.wa
            && textArray.length > 2
            && (textArray[0].toLowerCase() + textArray[1].toLowerCase()) === config.botName.toLowerCase() + ':wa') {
            textArray.splice(0, 2);
            var query = textArray.join(' ');
            W.query(from, to, query, bot);
        }
    }catch(e) {
        
    }
}

//JOIN EVENT
exports.join = function(channel, nick, message, bot, config){

}

//PART EVENT
exports.part = function(channel, nick, message, bot, config){

}

//PART EVENT
exports.raw = function(message, bot, config){

}

//ACTION EVENT
exports.action = function(from, to, message, bot, config){

}
