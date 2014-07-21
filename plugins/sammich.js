
//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.sammich) {
		var sammichText = text.toLowerCase();
		var botName = config.botName.toLowerCase();
		if(sammichText === botName + ': make me a sammich' ||
		   sammichText === botName + ': make me a sammich!' ||
		   sammichText === botName + ': make me a sammich.' ||
		   sammichText === botName + ': make me a sandwhich' ||
		   sammichText === botName + ': make me a sandwhich!' ||
		   sammichText === botName + ': make me a sandwhich.') {
				bot.action(to,' makes ' + from + ' a delicious sammich.');
		}
	}
}