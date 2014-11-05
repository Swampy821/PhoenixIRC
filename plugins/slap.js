function attack() {};

attack.prototype.slap = function(bot, to, user) {
	bot.action(to, 'slaps ' + user);
};

attack.prototype.stab = function(bot, to, user) {
	bot.action(to, 'stabs ' + user);
};

attack.prototype.kick = function(bot, to, user) {
	bot.action(to, 'kicks ' + user);
};

attack.prototype.eat = function(bot, to, user) {
	bot.action(to, 'eats ' + user);
};

attack.prototype.fish = function(bot, to, user) {
	bot.action(to, 'beats ' + user + ' with a large trout!');
};

attack.prototype.lick = function(bot, to, user) {
	bot.action(to, 'licks ' + user);
};

attack.prototype.rape = function(bot, to, user) {
	bot.action(to, 'rapes ' + user);
}



var a = new attack();

// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	//slap
	if(text.search(config.botName + ": slap")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.slap(bot, to, userToSlap);
	}
	//stab
	if(text.search(config.botName + ": stab")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.stab(bot, to, userToSlap);
	}
	//kick
	if(text.search(config.botName + ": kick")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.kick(bot, to, userToSlap);
	}
	//eat
	if(text.search(config.botName + ": eat")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.eat(bot, to, userToSlap);
	}
	//fish
	if(text.search(config.botName + ": fish")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.fish(bot, to, userToSlap);
	}
	//lick
	if(text.search(config.botName + ": lick")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.lick(bot, to, userToSlap);
	}
	if(text.search(config.botName + ": rape")===0 && config.plugins.slap===true) {
		var userToSlap = text.split(' ').splice(2,text.length).join(' ');
		a.rape(bot, to, userToSlap);
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
