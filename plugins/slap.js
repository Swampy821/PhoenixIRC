// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(text.search(config.botName + ": slap")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		bot.action(to, 'slaps ' + userToSlap);
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
