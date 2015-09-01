var request = require("request");
//MESSAGE EVENT
exports.message = function(from, to, text, message, bot, config){
	 if(config.plugins.finance) {
        var patt = new RegExp("!q" , "i");
        var res = patt.test(text);
        if(res) {
			var fuckYeahLocation = text.toLowerCase().indexOf("!q");
            text = text.substr(fuckYeahLocation + "!q".length, text.length).trim();
            if(text.length > 0) {
                text = encodeURI(text);
				request('http://finance.yahoo.com/webservice/v1/symbols/' + text + '/quote?format=json', function(error, response, body) {
					try{
						var data = JSON.parse(body);
						var quote = data.list.resources[0].resource.fields;
						bot.say(to, from + ": " + quote.symbol + " - " + quote.name + " - $" + quote.price + "");
					}catch(e) {
						bot.say(to, from + ": Could not complete lookup.");
					}
				});
			}
        }
    }
}
