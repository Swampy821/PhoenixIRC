//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(to.toLowerCase() === "#penguicon") {
		bot.say("#ihatebitches", from + ": "+text);
	}
}
