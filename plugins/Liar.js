/**
 * Created by Skylar on 1/24/14.
 */

exports.message = function(from, to, text, message, bot, config) {
	if(config.plugins.liar) {
	    var patt = new RegExp("liar|lie" , "i");
	    var res = patt.test(text);
	    if(res) {
	        bot.say(to, "http://i.imgur.com/XvUsaD9.jpg");
	    }
	}
}
