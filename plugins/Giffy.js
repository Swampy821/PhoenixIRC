var request = require('request');
//Message Event
exports.message = function(from, to, text, message, bot, config) {
    if(config.plugins.giffy) {
        var patt = new RegExp("!gif" , "i");
        var res = patt.test(text);
        if(res) {
            var fuckYeahLocation = text.toLowerCase().indexOf("!gif");
            text = text.substr(fuckYeahLocation + "!gif".length, text.length).trim();
            if(text.length > 0) {
                text = encodeURI(text);
                request('http://api.giphy.com/v1/gifs/search?q=' + text + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0', function(error, message, body) {
        			var body = JSON.parse(body);
                    if(body.data.length) {
            			var link = body.data[0].images.fixed_height.url;
            			bot.say(to, from + ": " + link);
                    }else{
                        bot.say(to, from + ": I do not have a giffy for you.");
                    }
        		});
            }
        }
    }
}

