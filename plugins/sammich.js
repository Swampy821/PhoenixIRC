
//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.sammich) {
		var sammichText = text.toLowerCase();
		var botName = config.botName.toLowerCase();
		if(sammichText === botName + ': make me a sammich' ||
		   sammichText === botName + ': make me a sammich!' ||
		   sammichText === botName + ': make me a sammich.' ||
		   sammichText === botName + ': make me a sandwich' ||
		   sammichText === botName + ': make me a sandwich!' ||
		   sammichText === botName + ': make me a sandwich.') {
				bot.action(to,' makes ' + from + ' a delicious sammich.');
		}
	}
}