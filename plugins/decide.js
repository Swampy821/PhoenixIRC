function decide(){}

decide.prototype.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

decide.prototype.decide = function(optionArray) {
	if(optionArray.length>1) {
		var index = this.getRandom(0, optionArray.length-1);
		return optionArray[index];
	}else{
		return optionArray[0];
	}
};

var d = new decide();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.decide===true) {
		var textArray = text.split(' ');
		if(textArray.length>3) {
			if(textArray[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
				textArray[1].toLowerCase() === 'decide') {
				textArray.splice(0,2);
				textArray = textArray.join(' ').split(',');
				var response = d.decide(textArray);
				if(response !== undefined) {
					bot.say(to, from + ': ' + response);
				}
			}
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
