function attack() {
	this.actions = {
		"slap":"slaps",
		"stab":"stabs",
		"kick":"kicks",
		"eat":"eats",
		"lick":"licks",
		"rape":"rapes",
		"paint":"paints",
		"inspect":"inspects",
		"fondle":"fondles",
		"punch":"punches",
		"smack":"smacks",
		"masturbate":"masturbates",
		"scratch":"scratches",
		"comfort":"comforts",
		"pat":"pats",
		"pet":"pets",
		"lynch":"lynches",
		"suck":"sucks",
		"hug":"hugs",
		"kiss":"Kisses"
	};
};

attack.prototype.randAction = function() {
	var keyArray = Object.keys(this.actions);
	var ranNum = Math.floor(Math.random() * keyArray.length);
	return this.actions[keyArray[ranNum]];
}

attack.prototype.process = function(bot, to, user, attack) {
	if(attack === 'random') {
		bot.action(to, this.randAction() + ' ' + user);
		return;
	}
	if(this.actions[attack]!== undefined) {
		bot.action(to, this.actions[attack] + ' ' + user);
	}
};


var a = new attack();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	//slap
	if(config.plugins.attack===true) {
		var tArray = text.split(' ');
		if(tArray.length>2 &&
			tArray[0].toLowerCase() === config.botName.toLowerCase() + ':') {
			var userToSlap = text.split(' ').splice(2,text.length).join(' ');
			a.process(bot, to, userToSlap, tArray[1].toLowerCase());
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
