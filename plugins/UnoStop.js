// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	var textArray = text.split(' ');
	if(textArray[0] === 'blockUno' && config.admins.indexOf(from)>-1) {
		if(config.plugins.unoStop) {
			config.plugins.unoStop = false;
			bot.say(to, 'Now unblocking uno.');
		}else{
			config.plugins.unoStop = true;
			bot.say(to, 'Now blocking uno.');
		}
	}

	if(textArray[0].toLowerCase() === '!uno' && config.plugins.unoStop===true) {
		setTimeout(function() {
			bot.say(to, '!unostop');
		},500);
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
