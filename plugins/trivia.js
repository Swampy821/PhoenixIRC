var fs = require('fs');
function trivia() {
	this.triviaQuestion = null;
	this.triviaAnswer = null;
}

trivia.prototype.init = function(config) {
	if(config.plugins.triviaFile === undefined ||
		config.plugins.triviaFile.length<3) {
		config.plugins.trivia = false;
		return;
	}
	var data = fs.readFileSync(config.plugins.triviaFile, 'utf8')
	
	var triviaObj = data.split('\n');
	for(var i=0; i<triviaObj.length; i++) {
		triviaObj[i] = triviaObj[i].split('`');
	}
	this.triviaObj = triviaObj;

};

trivia.prototype.getRandomInt = function() {
	return Math.floor(Math.random() * this.triviaObj.length) + 1
};

trivia.prototype.ask = function(to, bot) {
	if(this.triviaQuestion === null) {
		var i = this.getRandomInt();
		this.triviaQuestion = this.triviaObj[i][0];
		this.triviaAnswer = this.triviaObj[i][1];
		bot.say(to, this.triviaQuestion);
	}
};

trivia.prototype.answer = function(to, from, bot, answer) {
	if(this.triviaAnswer !== null &&
		this.triviaAnswer.toLowerCase() === answer.toLowerCase()) {
		bot.say(to, 'Huzzah! ' + from + ' was right! Use !trivia for a new question!');
		this.triviaQuestion = null;
		this.triviaAnswer = null;
	}
};

trivia.prototype.giveup = function(to, bot) {
	if(this.triviaQuestion !== null ) {
		bot.say(to, 'The answer was ' + this.triviaAnswer + '. Use !trivia for a new question!');
	}
}

var t = new trivia();

// Plugin initialization.
exports.init = function (bot, config) {
	t.init(config);
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.trivia === true) {
		var tArray = text.split(' ');
		if(tArray[0].toLowerCase() === '!trivia') {
			t.ask(to, bot);
		}
		if(tArray[0].toLowerCase() === '!giveup') {
			t.giveup(to, bot);
		}
		if(tArray[0].toLowerCase() === '!answer') {
			tArray.splice(0,1);
			var answer = tArray.join(' ');
			t.answer(to, from, bot, answer);
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
