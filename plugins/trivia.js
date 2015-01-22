var fs = require('fs');
var db = require('./DB/flatDB');
function trivia() {
	this.triviaQuestion = null;
	this.triviaAnswer = null;
	this.scoreObj = {};
	this.saveObj = 'tmp_files/score.json';
}

trivia.prototype.init = function(config) {
	if(config.plugins.trivia===false) { return; }
	var data = fs.readFileSync(this.getQuestionString(66), 'utf8')
	
	var triviaObj = data.split('\n');
	for(var i=0; i<triviaObj.length; i++) {
		triviaObj[i] = triviaObj[i].split('`');
	}
	this.triviaObj = triviaObj;

};

trivia.prototype.getRandomInt = function() {
	return Math.floor(Math.random() * this.triviaObj.length) + 1
};

trivia.prototype.getQuestionString = function(top) {
	var ranInt = Math.floor(Math.random() * top);
	var intStr = (ranInt<10 ? '0' + ranInt : ranInt);
	return 'tmp_files/questions_' + intStr;
}

trivia.prototype.save = function() {
	db.saveObj(this.saveObj, this.scoreObj);
};
trivia.prototype.load = function() {
	try{
		var scoreObj = db.openObj(__dirname + '/../' + this.saveObj);
		if(typeof scoreObj === 'object') {
			this.scoreObj = scoreObj;
		}
	}catch(e) {
		this.scoreObj = {};
	}
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
	if(to === undefined ||
	from === undefined ||
	answer === undefined) {
		return;
	}
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
		this.save();
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
	t.load();
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(config.plugins.trivia === true) {
		var tArray = text.split(' ');
		if(tArray[0] === undefined) { return; }
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
		if(tArray[0].toLowerCase() === '!newquestionset') {
			t.init(config);
			bot.say(to, 'New question set loaded for trivia.');
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
