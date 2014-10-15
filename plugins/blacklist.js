function blacklist(){};

blacklist.prototype.isNameOnList = function(list, name) {
	if(typeof list !== 'object') { return false; }
	for(var i=0; i<list.length; i++) {
		if(list[i] === name) {
			return i;
		}
	}
	return false;
};

blacklist.prototype.blacklistName = function(name, config) {
	if(this.isNameOnList(config.blacklist, name)===false) {
		config.blacklist.push(name);
	}
};

blacklist.prototype.whitelistName = function(name, config) {
	var nameIndex = this.isNameOnList(config.blacklist, name);
	if(nameIndex!==false) {
		config.blacklist.splice(nameIndex,1);
	}
}

blacklist.prototype.shareBlacklist = function(bot, room, config) {
	if(config.blacklist.length>0) {
		var list = config.blacklist.join(', ');
		bot.say(room, list);
	}else{
		bot.say(room, "I have no blacklisted users.");
	}
};

var l = new blacklist();
// Plugin initialization.
exports.init = function (bot, config) {

}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(l.isNameOnList(config.admins, from)===false) { return; }
	var textArray = text.toLowerCase().split(' ');
	if(textArray.length===0) { return; }
	if(textArray.length>1) {
		if(textArray[0]!== config.botName.toLowerCase() + ":" &&
			(textArray[1]!== 'blacklist' ||
			 textArray[1]!== 'whitelist')) { return; }
		if(textArray[1] === 'blacklist' &&
			textArray.length===2) {
			l.shareBlacklist(bot, to, config);
			return; 
		}

		if(textArray[1] === 'blacklist') {
			l.blacklistName(textArray[2], config);
			bot.say(to, 'I have blacklisted '+textArray[2]);
		}
		if(textArray[1] === 'whitelist') {
			l.whitelistName(textArray[2], config);
			bot.say(to, 'I have whitelisted '+textArray[2]);
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
