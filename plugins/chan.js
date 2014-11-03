var jsdom = require('jsdom');
// Plugin initialization.
exports.init = function (bot, config) {
}

//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){

	if(config.plugins.chan===true &&
		text.toLowerCase().indexOf(config.botName.toLowerCase() + ': chan')>-1) {
		jsdom.env({
		  url: "http://4chan.org/b/",
		  scripts: ["http://code.jquery.com/jquery.js"],
		  done: function (errors, window) {
		    var $ = window.$;
			bot.say(to, from + ': http:' + $('.fileThumb:first img:first').attr('src'));
		  }
		});
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
