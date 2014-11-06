var jsdom = require('jsdom');
function ex() {

}

ex.prototype.getExcuse = function(bot, to) {
	jsdom.env(
          'http://developerexcuses.com',
          ["http://code.jquery.com/jquery.js"],
          function (errors, window) {
            bot.say(to,"\"" + window.$("a").text().replace(/\n|\r/g,'') + "\"");
          }
        ); 
};


var e = new ex();


// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.excuse===true) {
		if(text.toLowerCase() === config.botName.toLowerCase() + ': what is coty\'s next excuse?' ||
			text.toLowerCase() === config.botName.toLowerCase() + ': excuse') {
			e.getExcuse(bot, to);
		}
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
