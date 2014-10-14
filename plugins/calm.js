// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.calm===true && text.match(/calm down/g) !== null) {
		var num = Math.floor(Math.random() * 30) + 1;
		bot.say(to, 'http://calmingmanatee.com/img/manatee'+num+'.jpg');
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
