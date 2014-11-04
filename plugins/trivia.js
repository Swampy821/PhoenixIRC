var fs = require('fs');
function trivia() {
	this.triviaQuestion = null;
	this.triviaAnswer = null;
	this.scoreObj = {};
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
		if(this.scoreObj[from.toLowerCase()] !== undefined) {
			this.scoreObj[from.toLowerCase()] +=1;
		}else{
			this.scoreObj[from.toLowerCase()] = 1;
		}
		this.triviaQuestion = null;
		this.triviaAnswer = null;
	}
};

trivia.prototype.giveup = function(to, bot) {
	if(this.triviaQuestion !== null ) {
		bot.say(to, 'The answer was ' + this.triviaAnswer + '. Use !trivia for a new question!');
		this.triviaQuestion = null;
		this.triviaAnswer = null;
	}
}

trivia.prototype.vowels = function(to, bot) {
	if(this.triviaAnswer===null) { return; }
	var vowels = ['a','e','i','o','u','y',' '];
	var answer = this.triviaAnswer;
	answer = answer.toLowerCase();
	var nAnswer = '';
	for(var i=0; i<answer.length; i++) {
		if(vowels.indexOf(answer[i])===-1) {
			nAnswer += '-';
		}else if(answer[i]===' ') {
			nAnswer += ' '; 
		}else{
			nAnswer += answer[i];
		}
	}
	bot.say(to, nAnswer);
};

trivia.prototype.score = function(to, bot, user) {
	var userLow = user.toLowerCase();
	var userScore = 0;
	if(this.scoreObj[userLow] !== undefined) {
		userScore = this.scoreObj[userLow];
	}
	bot.say(to, user + ' has ' + userScore + ' point(s).');
};

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
		if(tArray[0].toLowerCase() === '!vowels') {
			t.vowels(to, bot);
		}
		if(tArray[0].toLowerCase() === '!score' &&
			tArray.length>1) {
			t.score(to,bot,tArray[1]);
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
