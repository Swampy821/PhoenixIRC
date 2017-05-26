var jsdom = require('jsdom');
// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	try{
		if(config.plugins.chan===true &&
			text.toLowerCase().indexOf(config.botName.toLowerCase() + ': chan')>-1) {
			jsdom.env({
			  url: "http://4chan.org/b/",
			  scripts: ["http://code.jquery.com/jquery.js"],
			  done: function (errors, window) {
			    var $ = window.$;
				bot.say(to, from + ': http:' + $('.fileText:first a:first').attr('href'));
			  }
			});
		}else if(config.plugins.chan===true &&
			text.toLowerCase().indexOf(config.botName.toLowerCase() + ': mlp')>-1) {
			jsdom.env({
			  url: "http://4chan.org/mlp/",
			  scripts: ["http://code.jquery.com/jquery.js"],
			  done: function (errors, window) {
			    var $ = window.$;
				bot.say(to, from + ': http:' + $('.fileText:first a:first').attr('href'));
			  }
			});
		}
	}catch(e){
		return;
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
