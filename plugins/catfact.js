var request = require('request');
// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.catfact===true) {
		var t = text.split(' ');
		if(t[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
			t[1].toLowerCase() === 'catfact') {
			request.get('http://catfacts-api.appspot.com/api/facts', function(error,response,body) {
				var fact = JSON.parse(body).facts[0];
				bot.say(to, from + ": " + fact);
			})
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
