function cc() {};


cc.prototype.activate = function(config, plugin, bot, to) {
	if(config.plugins[plugin]!==undefined) {
		config.plugins[plugin] = true;
		bot.say(to, plugin + ' activated successfully!');
	}
}

cc.prototype.deactivate = function(config, plugin, bot, to) {
	if(config.plugins[plugin]!== undefined) {
		config.plugins[plugin] = false;
		bot.say(to, plugin + ' deactivated successfully!');
	}
}

cc.prototype.isAdmin = function(config, from) {
	for(var i=0; i<config.admins.length; i++) {
		if(config.admins[i].toLowerCase()===from.toLowerCase()) {
			return true;
		}
	}
	return false;
}

var c = new cc();
// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	if(c.isAdmin(config, from)===true) {
		var tArray = text.split(' ');
		if(tArray[0].toLowerCase() === config.botName.toLowerCase() + ':' &&
			tArray.length>2) {
			if(tArray[1].toLowerCase()==='activate') {
				c.activate(config,tArray[2], bot, to);
			}else if(tArray[1].toLowerCase() === 'deactivate') {
				c.deactivate(config, tArray[2], bot, to);
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
