//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.towel) {
		if(text.toLowerCase().indexOf('a towel')>-1) {
			bot.say(to,'http://tiger.towson.edu/~melvid1/towelie%20typing.jpg');
		}
	}
}
